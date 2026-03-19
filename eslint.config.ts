import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import nodePlugin from 'eslint-plugin-n';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  nodePlugin.configs['flat/recommended'],
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'n/no-process-exit': 'error',
      'n/no-missing-import': 'off', // ← add this
      'n/no-unpublished-import': 'off', // ← add this
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'eslint.config.ts'],
  },
);
