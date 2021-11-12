import { defineConfig, Plugin } from 'vite'
import loadVersion from 'vite-plugin-package-version'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'
import { readdirSync } from 'fs'
import path from 'path'
import postcss from './postcss.config.js'

function mockApiPlugin(): Plugin {
    return {
        name: 'mockApiPlugin',
        enforce: 'pre',
        resolveId: function (source, importer) {
            if (!source.endsWith('.ts')) return null

            const file = path.parse(source)
            const files = readdirSync('.' + file.dir)

            if (!files.includes(`${file.name}.mock.ts`)) return null

            const mockPath = `${file.dir}/${file.name}.mock.ts`
            console.log('mockPath', mockPath)
            return this.resolve(mockPath, importer)
        },
    }
}
// https://vitejs.dev/config/
const setConfig = ({ mode }) => {
    const isDev = mode === 'development'

    const plugins = [react(), macrosPlugin(), loadVersion()]
    console.log('process.env.VITE_MOCK_MODE', process.env.VITE_MOCK_MODE)
    if (process.env.VITE_MOCK_MODE) {
        plugins.unshift(mockApiPlugin())
    }
    return defineConfig({
        base: process.env.BASE_URL || '/',
        plugins: plugins,
        esbuild: {
            jsxInject: `import React from 'react'`,
        },
        build: {
            sourcemap: true,
        },

        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: '/src',
                },
            ],
        },
        css: {
            postcss,
        },
    })
}

export default setConfig
