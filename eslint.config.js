import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte']
			},
			globals: {
				document: 'readonly',
				window: 'readonly',
				fetch: 'readonly'
			}
		},
		ignores: ['build/', '.svelte-kit/', 'node_modules/', 'dist/']
	}
];
