// https://fuse-box.org/page/
const { FuseBox, SassPlugin, BabelPlugin, CSSResourcePlugin, CSSPlugin, WebIndexPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir : "src",
    target : 'browser@es6',
    output : "dist/$name.js",
    useTypescriptCompiler : true,
    plugins : [
        [
            SassPlugin(),
            CSSResourcePlugin({ dist: "dist/css-resources" }),
            CSSPlugin(),
            WebIndexPlugin(),
            // BabelPlugin({
            //     config: {
            //     sourceMaps: true,
            //     presets: ["es2015"],
            //     plugins: [
            //         ["transform-react-jsx"],
            //     ],
            //     },
            // })
        ]
    ],
})
fuse.dev(); // launch http server
fuse.bundle("app")
    .instructions(" > index.jsx").hmr().watch()
    .completed( proc => proc.start)
fuse.run();
