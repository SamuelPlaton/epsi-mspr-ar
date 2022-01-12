const path = require('path');
const metroBundler = require('metro-bundler');

// @todo: remove file if not useful to AR object loading
const config = {
  extraNodeModules: {
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    react: path.resolve(__dirname, 'node_modules/react'),
  },
  getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(__dirname),
    ];
  },
};

module.exports = config;
