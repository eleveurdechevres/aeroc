const { FuseBox, SassPlugin, CSSResourcePlugin, CSSPlugin, WebIndexPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir : "src",
    target : 'browser@es6',
    output : "dist/$name.js",
    useTypescriptCompiler : true,
    plugins : [
        [SassPlugin(), CSSResourcePlugin({ dist: "dist/css-resources" }), CSSPlugin()],
        WebIndexPlugin()
    ]
})
fuse.dev(); // launch http server
fuse.bundle("app")
    .instructions(" > index.jsx").hmr().watch()
    .completed( proc => proc.start)
fuse.run();
