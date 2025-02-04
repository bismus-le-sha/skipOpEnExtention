import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,

  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      jest: pluginJest
    },
    env: { 'jest/globals': true }
  }
];
