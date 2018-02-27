const { FuseBox, WebIndexPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir : "src",
    target : 'browser@es5',
    output : "dist/bundle.js",
    plugins : [
        WebIndexPlugin()
    ]
})
fuse.dev(); // launch http server
fuse.bundle("app")
    .completed( proc => proc.start)
    .instructions("> index.jsx").hmr().watch()
fuse.run();
