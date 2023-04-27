import httpStatus from 'http-status';
import Response from '../../helpers/response';
import authService from './auth.service';

export const signup = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await authService.signup(data);
    return Response.success(res, result, httpStatus.CREATED);
  } catch (exception) {
    next(exception);
  }
};

const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
  res.cookie('refreshToken', token, cookieOptions);
};

export const login = async (req, res) => {
  const { user } = req;
  const ipAddress = req.ip;
  const result = await authService.login(user, ipAddress);
  setTokenCookie(res, result.refreshToken);
  // return the information including token as JSON
  return Response.success(res, result, httpStatus.OK);
};

export const logout = async (req, res, next) => {
  try {
    const { token } = req.body;
    // eslint-disable-next-line no-unused-vars
    const result = await authService.logout(token);
    return Response.success(res, null, httpStatus.OK);
  } catch (exception) {
    next(exception);
  }
};

export const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.checkEmailIsValid(email);
    return Response.success(res, result, httpStatus.OK);
  } catch (exception) {
    next(exception);
  }
};

export const checkUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const result = await authService.checkUsernameIsValid(username);
    return Response.success(res, result, httpStatus.OK);
  } catch (exception) {
    next(exception);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    await authService.forgotPassword(email);
    return Response.success(res);
  } catch (exception) {
    next(exception);
  }
};

export const verifyCode = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await authService.verifyCode(data);
    return Response.success(res, result);
  } catch (exception) {
    next(exception);
  }
};

export const resetPassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const { user } = req;
  try {
    const result = await authService.resetPassword(user, newPassword);
    return Response.success(res, result);
  } catch (exception) {
    next(exception);
  }
};

export const loginWithApple = async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    const result = await authService.loginWithApple(accessToken);

    return Response.success(res, result);
  } catch (e) {
    next(e);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const token = req.body.refreshToken || req.cookies.refreshToken;
    const ipAddress = req.ip;
    const result = await authService.refreshToken(token, ipAddress);
    return Response.success(res, result);
  } catch (exception) {
    next(exception);
  }
};
