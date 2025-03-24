import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import { compatibleLegacyConfig as compat } from '@eslint/compat'

const eslintConfig = defineConfig([
  ...nextVitals,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  ...compat.config({
    extends: ['plugin:@tanstack/query/recommended', 'next/core-web-vitals', 'next/typescript'],
    rules: {
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }),
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
