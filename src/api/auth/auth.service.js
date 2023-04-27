/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
import User from '../users/users.model';
import { jwt, MailService } from '../../services';
import { utils } from '../../helpers';
import { decodeToken } from '../../helpers/utils';
// import deviceTokenService from '../deviceTokens/deviceToken.service';
import userService from '../users/users.service';
import refreshTokenService from '../refreshTokens/refreshToken.service';

const generateToken = (user) =>
  jwt.sign({
    uid: user._id,
    role: user.role,
  });

const signup = async (data) => {
  const user = await User.create(data);
  const token = generateToken(user);
  const refreshToken = jwt.refreshSign(user._id);
  const result = {
    user,
    token,
    refreshToken,
    expireIn: process.env.JWT_EXPIRES,
  };
  return result;
};

const generateRefreshToken = async (user, ipAddress) => {
  const refreshToken = jwt.refreshSign(user._id);
  // save the token
  return refreshTokenService.create({
    user: user._id,
    token: refreshToken,
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress,
  });
};

const login = async (user, ipAddress) => {
  const token = generateToken(user);
  const refreshToken = await generateRefreshToken(user, ipAddress);
  return { token, expireIn: process.env.JWT_EXPIRES, refreshToken };
};

const logout = async (token) =>
  // const result = await deviceTokenService.deleteDeviceTokenByToken(token);
  token;
const checkEmailIsValid = async (email) => {
  const count = await User.countDocuments({ email });
  let result = { isValid: true, message: 'Your email is valid!' };
  if (count > 0) {
    result = { isValid: false, message: 'Your email already exists!' };
  }
  return result;
};

const checkUsernameIsValid = async (username) => {
  const count = await User.countDocuments({ username });
  let result = { isValid: true, message: 'Your username is valid!' };
  if (count > 0) {
    result = { isValid: false, message: 'Your username already exists!' };
  }
  return result;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`User not found with email: ${email}`);
  } else {
    const passcode = utils.randomVerfiedCode();
    user.resetPasswordToken = passcode;
    user.resetPasswordExpires = Date.now() + 360000; // expires in 1 hour
    await user.save();
    const mailService = new MailService();
    mailService.passwordResetEmail(email, passcode);
  }
};

const resetPassword = async (user, password) => {
  user.password = password;
  const result = await user.save();
  return result;
};

const verifyCode = async (data) => {
  const { code, email } = data;
  const user = await User.findOne({
    resetPasswordToken: code,
    email,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error('Code is invalid or has expired!');
  } else {
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    const token = jwt.sign(user._id);
    return { user, token };
  }
};

const loginWithApple = async (token) => {
  const decodedToken = decodeToken(token);
  const userDetail = await User.findOne({ email: decodedToken.email });

  if (userDetail) {
    const userToken = jwt.sign(userDetail._id);
    return { user: userDetail, token: userToken };
  }
  const newUser = await User.create({
    email: decodedToken.email,
    full_name: decodedToken.email,
    apple: { id: decodedToken.sub, token },
  });

  const userToken = jwt.sign(newUser._id);
  return { user: newUser, token: userToken };
};

const refreshToken = async (token, ipAddress) => {
  const refreshToken1 = await refreshTokenService.findOne({
    token,
  });
  if (refreshToken1) {
    const user = await userService.findById(refreshToken1.user);
    const newToken = generateToken(user);
    const newRefreshToken = await generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    return { user, token: newToken, refreshToken: newRefreshToken.token };
  }
  throw new Error('The refresh token is invalid!');
};

export default {
  signup,
  login,
  logout,
  checkEmailIsValid,
  checkUsernameIsValid,
  forgotPassword,
  resetPassword,
  verifyCode,
  loginWithApple,
  refreshToken,
};
