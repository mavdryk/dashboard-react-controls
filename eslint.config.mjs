import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      semi: ['error', 'never'],
      'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 1,
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-console': process.env.NODE_ENV === 'production' ? 2 : 0
    }
  }
]
