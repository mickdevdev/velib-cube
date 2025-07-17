import globals from 'globals';
import js from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        ...globals.jest,
        fetch: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      jest: jestPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      ...jestPlugin.configs.recommended.rules,
    },
  },
  eslintPluginPrettierRecommended,
];
