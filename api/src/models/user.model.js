const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter first name."],
  },
  last_name: {
    type: String,
    required: [true, "Please enter last name."],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter username"],
    maxlength: [30, "Your first name cannot exceed 30 characters."],
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    //required: [true, "Please enter your password."],
    //minlength: [4, "Your password must be at least 4 characters."],
    select: false,
  },
  pin_number: {
    type: String,
    minlength: [4, "Your pin must be at least 4 characters."],
    select: false,
  },
  qrcode: {
    type: String
  },
  qrcodeImg: {
    type: String
  },
  device_id: {
    type: String
  },
  status: {
    type: String,
    enum: ["Active", "InActive", "Blocked", "Suspended"],
    default: "InActive"
  },
  role: {
    type: String,
    default: "user",
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  user_type: {
    type: String,
    default: "1"
  },
  available: {
    type: Boolean,
    default: false
  },
  fire_base_token: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  }
});

//encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);