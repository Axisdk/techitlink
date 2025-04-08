import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import angularEslint from '@angular-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});
export default defineConfig([
	{
		ignores: ['node_modules', 'dist', 'build', 'temp.js', 'config/*'],
		extends: compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:@angular-eslint/recommended',
			'plugin:prettier/recommended',
		),
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'@angular-eslint': angularEslint,
			prettier,
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 5,
			sourceType: 'script',
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: '.',
			},
		},
		rules: {
			'prettier/prettier': 'off',
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'@typescript-eslint/member-ordering': [
				'error',
				{
					default: [
						'protected-readonly-field',
						'readonly-field',
						'public-instance-field', // Input, Output, Subject
						'private-field',
						'protected-field',
						'public-field',
						'private-get',
						'protected-get',
						'public-get',
						'private-set',
						'protected-set',
						'public-set',
						'constructor',
						'private-method',
						'protected-method',
						'public-method',
					],
				},
			],
			'@typescript-eslint/no-explicit-any': 'error', // Запрещен any
			'@typescript-eslint/no-unused-vars': 'error', // Запрещены неиспользуемые переменные
			'@angular-eslint/prefer-standalone': 'off', //	Разрешен standalone: false
			'@angular-eslint/no-output-on-prefix': 'off', // Разрешен префикс "on" на Output
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/explicit-function-return-type': 'error', // Обязательная типизация возврата функции
		},
	},
]);
