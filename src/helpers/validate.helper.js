import Private from '../model/private.model.js';
import User from '../model/users.model.js';

const CategoryEnum = {
  React: 'react',
  Vue: 'vue',
  Angular: 'angular',
  NextJs: 'next',
  Express: 'express',
  NestJS: 'nest',
  ReactNative: 'react-native',
  Flutter: 'flutter',
  VanillaJS: 'vanilla',
};

export const validatePublic = ({ name, url, category, description }) => {
  // console.log({ name, url, category, description });
  if (!name || !url || !category) {
    return {
      status: 400,
      message: 'All fields are required',
    };
  }

  if (
    typeof name !== 'string' ||
    typeof url !== 'string' ||
    typeof category !== 'string' ||
    typeof description !== 'string'
  ) {
    return {
      status: 400,
      message: 'Invalid data type',
    };
  }

  if (!Object.values(CategoryEnum).includes(category)) {
    return {
      status: 400,
      message: 'Invalid category value',
    };
  }

  return null;
};

export const validatePrivate = async ({ user, name, url }) => {
  if (!user || !name || !url) {
    return {
      status: 400,
      message: 'All fields are required',
    };
  }

  if (
    typeof user !== 'string' ||
    typeof name !== 'string' ||
    typeof url !== 'string'
  ) {
    return {
      status: 400,
      message: 'Invalid data type',
    };
  }
  const userExists = await Private.findById(user);
  if (!userExists) {
    return {
      status: 404,
      message: `User with ID ${user} not found`,
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
