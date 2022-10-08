module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // 組み込みモジュール
          'external', // npmでインストールした外部ライブラリ
          'internal', // 自作モジュール
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always', // グループ毎にで改行を入れる
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc', // 昇順にソート
          caseInsensitive: true, // 小文字大文字を区別する
        },
        pathGroups: [
          // 指定した順番にソートされる
          {
            pattern: '@/components/common',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/hooks',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
};
