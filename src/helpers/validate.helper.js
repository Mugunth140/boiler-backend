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
