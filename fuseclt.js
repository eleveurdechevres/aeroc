#!/usr/bin/env node

const { FuseBox, CSSPlugin } = require("fuse-box");
const fs = require("fs-extra");
const path = require("path");
const argv = require("yargs").argv;

process.chdir(__dirname);
let buildDir = fs.readlinkSync("client");
fs.emptyDirSync(buildDir);
buildDir = fs.realpathSync(buildDir);

fs.copySync("src/index.html", `${buildDir}/index.html`);
fs.copySync("node_modules/@blueprintjs/core/resources", `${buildDir}/resources`);
//fs.copySync("deepstream.js", `${buildDir}/deepstream.js`);

const fuse = FuseBox.init({
    homeDir: `${__dirname}/src`,
    sourceMaps: true,
    output: `${buildDir}/$name.js`,
    plugins: [
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

if (argv.dev) fuse.dev({port: 3002, httpServer: false});
const app = fuse.bundle("bundle").target("browser").instructions(">index.tsx");
if (argv.dev) app.hmr().watch();

const typechecker = require('fuse-box-typechecker').TypeHelper({
    name: 'Type check for client',
    basePath:`${__dirname}/src`,
    tsConfig: './tsconfig.json',
    emit: false,
    quit: true,
    watch: false,

    throwOnSyntactic: false,
    yellowOnSyntactic: false,
    throwOnGlobal: false,
    throwOnOptions: false,    
    yellowOnSemantic: true,
    yellowOnLint: true
});
if (argv.dev) typechecker.createThread();
app.completed( proc => {
    if (argv.dev) {
        typechecker.inspectCodeWithWorker(Object.assign(typechecker.options, { quit: false, type: 'watch' }));
        typechecker.printResultWithWorker();
    }
    else {
        typechecker.runSync();
    }
});

fuse.run();
