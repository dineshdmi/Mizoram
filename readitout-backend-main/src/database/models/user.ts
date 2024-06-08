import mongoose from "mongoose";
interface user extends mongoose.Document {
  name: String;
  email: String;
  password: String;
  authToken: String;
  userType: Number;
  createdAt: Date;
  updatedAt: Date;
  isBlock: Boolean;
}
const userSchema: any = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null, unique: true, lowercase: true },
    alter_email: { type: String },
    // password: { type: String, default: '$2b$10$rIvul8xfkDa8uiE5pLh75.5BOFrR0ru/RTrLBYQhxljeSzdRsv8ja' },
    password: { type: String, default: null },
    phoneNumber: { type: String, default: null, unique: true },
    alter_phoneNumber: { type: String, default: null },
    address: { type: String, default: null },
    country: { type: String, default: null },
    region: { type: String, default: null },
    city: { type: String, default: null },
    countryCode: { type: Number, default: null },
    // countryId: { type: mongoose.Schema.Types.ObjectId },
    // regionId: { type: mongoose.Schema.Types.ObjectId },
    // cityId: { type: mongoose.Schema.Types.ObjectId },
    dob: { type: Date, default: null },
    district: { type: String, default: null },
    PINCode: { type: String },
    teacherID: { type: String, default: null },
    schoolName: { type: String, default: null },
    image: { type: String, default: null },
    age: { type: String, default: null },
    gender: { type: Number, default: 0 },
    authToken: { type: Number, default: null },
    facebookId: { type: String, default: null },
    socket_id: { type: String },
    otp: { type: Number, default: null },
    phone_otp: { type: Number, default: null },
    otpScreen: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: true },
    isPhoneVerified: { type: Boolean, default: true },
    phone_otpScreen: { type: Boolean, default: true },
    otpExpireTime: { type: Date, default: null },
    accountType: { type: Number, default: 0, enum: [0, 1, 2, 3] }, // 0 - regular || 1 - google || 2 - facebook || 3 -twitter
    userType: { type: Number, default: 0, enum: [0, 1, 2, 3, 4, 5, 6] }, // 0 - teacher || 1 - admin || 2 - student || 3 - sub_admin || 4 - auditor || 5 - upload || 6 - faculty
    visitorCount: { type: Number, default: null },
    isActive: { type: Boolean, default: true },
    isExp: { type: Date, default: null },
    isVerify: { type: Boolean, default: false },
    isBlock: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    subscriptionExpDate: { type: Date, default: null },
    registeredDate: { type: String, default: null },
    register_password: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<any>("user", userSchema);
