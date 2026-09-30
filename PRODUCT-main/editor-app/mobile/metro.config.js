const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix phosphor-react-native resolution on Windows/OneDrive.
// The package declares "react-native": "src/index.tsx" which makes Metro
// try to resolve 1500+ individual TSX icon files from src/. Each of those
// then tries to import from 'phosphor-react-native' again (for the Icon type),
// creating a circular resolution that fails on Windows paths with spaces/OneDrive.
//
// Solution: intercept resolution for this package and force the commonjs build.
const origResolver = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'phosphor-react-native') {
    // Force Metro to use the commonjs build (which doesn't have ESM issues)
    return {
      type: 'sourceFile',
      filePath: path.resolve(
        __dirname,
        'node_modules',
        'phosphor-react-native',
        'lib',
        'commonjs',
        'index.js'
      ),
    };
  }
  if (origResolver) {
    return origResolver(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
