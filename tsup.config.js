import { defineConfig } from 'tsup';
import pkg from './package.json'
import fs from 'fs'
import path from 'path';
export default defineConfig({
    entry: ['./lib/index.ts'],
    format: ['cjs', 'esm'],
    // dts: { entry: { index: './src/lib/components/SearchBox/types.d.ts' } },
    // minify: true,
    clean: true,
    outExtension({ format }) {
        return format === 'esm' ? { js: `.${format}.js` } : { js: '.js' };
    },
    // async onSuccess() {
    //     delete pkg.dependencies,
    //         delete pkg.devDependencies,
    //         delete pkg.scripts,
    //         pkg.peerDependencies = {
    //             "react": ">=18.0.0",
    //             "react-dom": ">=18.0.0",
    //         }
    // }
});
