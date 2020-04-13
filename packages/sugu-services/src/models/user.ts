import { Schema, Document, model, Types } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
const saltRounds = 10;

export interface IUser extends Document {
  email: string;
  nickName: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
  config: object;
  isCorrectPassword: (password: string) => Promise<Boolean>;
  generateJWT: () => string;
  toAuthJSON: () => object;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  nickName: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  password: { type: String, required: true },
  config: {
    type: Schema.Types.Mixed,
    required: true,
    default: {
      preferences: {
        language: 'es',
      },
    },
  },
});

// All the prototypes methods

UserSchema.methods.isCorrectPassword = function (password: string) {
  return compare(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  const exp = expirationDate.getTime() / 1000;
  return sign(
    {
      email: this.email,
      id: this._id,
      exp,
    },
    'secret',
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    email: this.email,
    token: this.generateJWT(),
  };
};

// All the pre methods
UserSchema.pre('save', function (next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document: any = this;
    hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// Export the model and return your IUser interface
export default model<IUser>('User', UserSchema);
