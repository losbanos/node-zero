import {defineConfig} from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default commandLineArgs => {
    if (commandLineArgs.configDebug) {
        return [
            {
                input: 'src/app.js',
                output: {
                    file: 'dist/bundle.js',
                    format: 'umd'
                },
            },
            {
                input: 'src/launchTime.js',
                output: [
                    {
                        file: 'dist/bundle2.js',
                        format: 'cjs'
                    },
                    {
                        name: 'bundle3',
                        file: 'dist/bundle3.js',
                        format: 'umd'
                    }
                ],
                plugins: [
                    nodeResolve(),
                    commonjs()
                ]
            }
        ]
    } else {
        return {
            input: 'src/app.js',
            output: {
                file: 'dist/bundle.js',
                format: 'esm'
            },
        }
    }
}