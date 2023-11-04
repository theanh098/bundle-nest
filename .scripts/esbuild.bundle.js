const path = require('node:path');
const esbuild = require('esbuild');
const esbuildPluginTsc = require('esbuild-plugin-tsc');

const nodeModuleExclusionPlugin = require('../esbuild-plugins/exclude-node-modules');
const nativeModulePlugin = require('../esbuild-plugins/native-modules');

function main() {
  const cwd = process.cwd();

  const outfile = path.resolve(cwd, 'bundle/main.js');
  const entryPoints = [path.resolve(cwd, 'src/main.ts')];

  esbuild
    .build({
      platform: 'node',
      target: 'node18',
      bundle: true,
      minify: true,
      sourcemap: true,
      plugins: [
        nodeModuleExclusionPlugin,
        nativeModulePlugin,
        esbuildPluginTsc(),
      ],
      entryPoints,
      outfile,
      external: [
        '@nestjs/microservices',
        '@nestjs/websockets',
        'cache-manager',
        'class-transformer',
        'class-validator',
      ],
    })
    .then(() => console.log('finished'));
}

main();
