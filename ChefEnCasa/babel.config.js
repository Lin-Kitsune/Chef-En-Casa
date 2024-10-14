module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',  // Este debe estar presente si usas Reanimated
    ['@babel/plugin-transform-private-methods', { loose: true }],  // Agrega este plugin
  ],
};
