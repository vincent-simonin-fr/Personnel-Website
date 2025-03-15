const eslintConfig = [
  ...compat.config({
    extends: ['plugin:@tanstack/query/recommended', 'next/core-web-vitals', 'next/typescript'],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }),
]

export default eslintConfig
