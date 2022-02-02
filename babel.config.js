module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript', '@babel/preset-env'],
    plugins: [
      [
        'babel-plugin-module-resolver',
        // {
        //   alias: {
        //     'expo-three': './build',
        //   },
        // },
      ],
    ],
  };
};
