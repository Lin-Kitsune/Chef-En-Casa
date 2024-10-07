const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('svg'); // Asegura que Metro pueda manejar archivos .svg

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'], // Extensiones que debe manejar Metro
    extraNodeModules: {
      'react-native-svg': require.resolve('react-native-svg'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
