import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: devMode ? 'inline' : false,
    plugins: [
      terser({
        ecma: 2020,
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
          drop_console: !devMode,
          drop_debugger: !devMode
        },
        output: { quote_style: 1 }
      })
    ]
  },
  plugins: [
    typescript() // Add TypeScript plugin
  ]
};
