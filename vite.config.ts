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
            return this.resolve(mockPath, importer)
        },
    }
}

const setConfig = ({ mode }) => {
    const plugins = [react(), macrosPlugin(), loadVersion()]

    if (mode === 'mock') {
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
                {
                    find: 'jquery',
                    replacement: 'gridstack/dist/jq/jquery.js',
                },
                {
                    find: 'jquery-ui',
                    replacement: 'gridstack/dist/jq/jquery-ui.js',
                },
                {
                    find: 'jquery.ui',
                    replacement: 'gridstack/dist/jq/jquery-ui.js',
                },
                {
                    find: 'jquery.ui.touch-punch',
                    replacement: 'gridstack/dist/jq/jquery.ui.touch-punch.js',
                },
            ],
        },
        css: {
            postcss,
        },
    })
}

export default setConfig
