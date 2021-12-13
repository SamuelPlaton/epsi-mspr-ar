import 'dotenv/config';

export default {
  name: 'EPSI MSPR AR',
  version: '1.0.0',
  extra: {
    cmsUrl: process.env.CMS_URL,
    enableUserRegistration: process.env.ENABLE_USER_REGISTRATION,
  },
};
