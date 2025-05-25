import User from '../model/users.model.js';

const PlatformEnum = {
  WEB: 'web',
  ANDROID: 'android',
  IOS: 'ios',
  WINDOWS: 'windows',
  MAC: 'mac',
  LINUX: 'linux',
  OTHER: 'other',
};

export const validatePublic = ({ name, url, platform, description }) => {
  if (!name || !url || !platform || !description) {
    return {
      status: 400,
      message: 'All fields are required',
    };
  }

  if (
    typeof name !== 'string' ||
    typeof url !== 'string' ||
    typeof platform !== 'string' ||
    typeof description !== 'string'
  ) {
    return {
      status: 400,
      message: 'Invalid data type',
    };
  }

  if (!Object.values(PlatformEnum).includes(platform)) {
    return {
      status: 400,
      message: 'Invalid platform value',
    };
  }

  return null;
};

export const validatePrivate = ({ username, password, repository }) => {
  if (!username || !password || !repository) {
    return {
      status: 400,
      message: 'All fields are required',
    };
  }

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof repository !== 'object'
  ) {
    return {
      status: 400,
      message: 'Invalid data type',
    };
  }

  return null;
};

export const validateUser = async ({ username, password }) => {
  if (!username || !password) {
    return {
      status: 400,
      message: 'Both username and password are required',
    };
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return {
      status: 400,
      message: 'Username and password must be strings',
    };
  }

  if (password.length < 8) {
    return {
      status: 400,
      message: 'Password must be at least 8 characters long',
    };
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return {
      status: 409,
      message: 'Username is already taken',
    };
  }

  return null;
};
