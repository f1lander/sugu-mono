import { Document, Error, Schema, model } from 'mongoose';

interface Settings {
  language?: string;
  intro?: boolean;
  newsFeedLastSeen?: Date;
}

export type CompanyModel = Document & {
  name: string;
  companyId: string;
  domain: string;
  logo: string;
  email: string;
  settings: Settings;
  notificationId: string;
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
  country?: string;
};

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'domain is not a valid URL',
      ],
    },
    logo: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'logo is not a valid URL',
      ],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'email is not a valid email address',
      ],
    },
    settings: {
      language: { type: String, default: 'en' },
      intro: { type: Boolean, default: true },
      newsFeedLastSeen: { type: Date },
    },
    country: { type: String },
    notificationId: { type: String, required: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Company = model<CompanyModel>('Company', CompanySchema);

export default Company;
