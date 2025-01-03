import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    ignores: ['./node_modules', './ios', './andorid', './.tamagui', './.expo'],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'error',
      'prefer-arrow-callback': 'error',
      'no-restricted-syntax': [
        'error',
        'FunctionExpression',
        'FunctionDeclaration'
      ],
      'react/react-in-jsx-scope': 'off'
    }
  }
];
