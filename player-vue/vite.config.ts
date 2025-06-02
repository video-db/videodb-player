/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			/*
			 * We recommend to not use aliases in the lib's source,
			 * because they will leak into the generated d.ts files and then
			 * break the lib's types in the consuming app.
			 */
		},
	},
	build: {
		lib: {
			name: 'Lib', // TODO: CHANGE_ME
			entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
			formats: ['es', 'cjs', 'iife'],
			fileName: (format) => {
				switch (format) {
					case 'es':
						return 'index.mjs'
					case 'cjs':
						return 'index.cjs'
					case 'iife':
						return 'index.js'
					default:
						return 'index.js'
				}
			},
		},
		minify: false,
		rollupOptions: {
			external: ['vue'],
			output: {
				banner: `
/**
 *  Copyright ${new Date(Date.now()).getFullYear()}  VideoDB 
 *  @license MIT
**/
`,
				exports: 'named',
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	test: {
		environment: 'jsdom',
	},
})