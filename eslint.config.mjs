import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'node_modules/', 'coverage/'] },
  js.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    braceStyle: '1tbs',
    arrowParens: true,
    commaDangle: 'always-multiline',
  }),
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      '@stylistic/max-len': ['warn', { code: 140, ignoreStrings: true, ignoreTemplateLiterals: true }],
    },
  },
  {
    files: ['webpack.config.js', '**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ['src/tests/**/*.js'],
    languageOptions: { globals: { ...globals.jest, ...globals.node } },
  },
];
