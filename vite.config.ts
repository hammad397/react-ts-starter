import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { terser } from 'rollup-plugin-terser';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      mode !== 'development' &&
        terser({
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        }),
    ],
    root: '.',
    build: {
      outDir: './dist',
    },
    define: processEnvValues,
  };
});
