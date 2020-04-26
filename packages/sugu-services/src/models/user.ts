import { Schema, Document, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const saltRounds = 10;

export interface User extends Document {
  email: string;
  nickName: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
  config: object;
  isCorrectPassword: (password: string) => Promise<boolean>;
  generateJWT: () => string;
  toAuthJSON: () => object;
}

const UserSchema = new Schema<User>({
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

UserSchema.methods.isCorrectPassword = function isCorrectPassword(
  password: string,
): Promise<boolean> {
  return compare(password, this.password);
};

UserSchema.methods.generateJWT = function generateJWT(): string {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  const exp = expirationDate.getTime() / 1000;
  return sign(
    {
      email: this.email,
      id: this._id, // eslint-disable-line no-underscore-dangle
      exp,
    },
    'secret',
  );
};

UserSchema.methods.toAuthJSON = function toAuthJSON(): {
  email: string;
  token: string;
} {
  return {
    email: this.email,
    token: this.generateJWT(),
  };
};

UserSchema.pre<User>('save', function pre(next) {
  if (this.isNew || this.isModified('password')) {
    hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

export default model<User>('User', UserSchema);
