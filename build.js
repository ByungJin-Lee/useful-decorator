import esbuild from 'esbuild';

/**
 * @see https://esbuild.github.io/api/#build
 */
const baseConfig = {
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  sourcemap: true,
};

/**
 * about esm
 */
const esmConfig = {
  ...baseConfig,
  format: 'esm',
};
/**
 * about cjs
 */
const cjsConfig = {
  ...baseConfig,
  format: 'cjs',
  outExtension: {
    '.js': '.cjs',
  },
};

/** build */
Promise.all([esbuild.build(esmConfig), esbuild.build(cjsConfig)]).catch(err =>
  console.error(err)
);
