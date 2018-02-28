#!/usr/bin/env node

const { FuseBox, SassPlugin, BabelPlugin, CSSResourcePlugin, CSSPlugin, WebIndexPlugin } = require("fuse-box");
const fs = require("fs-extra");
const path = require("path");
const argv = require("yargs").argv;

// https://fuse-box.org/page/
// const fuse = FuseBox.init({
//     homeDir : "src",
//     target : 'browser@es6',
//     output : "dist/$name.js",
//     useTypescriptCompiler : true,
//     plugins : [
//         [
//             SassPlugin(),
//             CSSResourcePlugin({ dist: "dist/css-resources" }),
//             CSSPlugin(),
//             WebIndexPlugin(),
//             // BabelPlugin({
//             //     config: {
//             //     sourceMaps: true,
//             //     presets: ["es2015"],
//             //     plugins: [
//             //         ["transform-react-jsx"],
//             //     ],
//             //     },
//             // })
//         ]
//     ],
// })

const fuse = FuseBox.init({
    homeDir: `src`,
    sourceMaps: true,
    output: `$name.js`,
    plugins: [
        SassPlugin(),
        CSSResourcePlugin({ dist: "dist/css-resources" }),
        CSSPlugin(),
        WebIndexPlugin(),
        CSSPlugin()
    ],
    shim: {
        ws: {
            exports: "{}"
        }
    },
    debug: true,
    log: true,
    cache: true
});

fuse.dev({port: 3002, httpServer: false}); // launch http server
const app = fuse.bundle("bundle")
    .target("browser")
    // .completed( proc => proc.start)
    .instructions(">index.tsx");
/*if (argv.dev) */ app.hmr().watch();

fuse.run();
