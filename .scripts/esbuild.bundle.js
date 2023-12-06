const esbuild = require("esbuild");
const esbuildPluginTsc = require("esbuild-plugin-tsc");

const nodeModuleExclusionPlugin = require("../esbuild-plugins/exclude-node-modules");
const nativeModulePlugin = require("../esbuild-plugins/native-modules");

function main() {
  esbuild
    .build({
      platform: "node",
      target: "node18",
      bundle: true,
      minify: true,
      sourcemap: true,
      plugins: [
        nodeModuleExclusionPlugin,
        nativeModulePlugin,
        esbuildPluginTsc()
      ],
      entryPoints: ["./src/main.ts", "./src/command.ts"],
      outdir: "build",
      external: [
        "@nestjs/microservices",
        "@nestjs/websockets",
        "cache-manager",
        "class-transformer",
        "class-validator"
      ]
    })
    .then(() => console.log("finished"));
}

main();
