const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

config.resolver.sourceExts = [
  'js', 'jsx', 'ts', 'tsx', 'json', 'svg', 'cjs', 'mjs',
  'web.js', 'web.jsx', 'web.ts', 'web.tsx',
];

module.exports = config;
