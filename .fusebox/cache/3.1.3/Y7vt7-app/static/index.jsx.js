module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar React = require(\"react\");\r\nvar ReactDOM = require(\"react-dom\");\r\nrequire(\"./index.css\");\r\nvar app_1 = require(\"./app\");\r\nvar registerServiceWorker_1 = require(\"./registerServiceWorker\");\r\nReactDOM.render(React.createElement(app_1.App, null), document.getElementById('root'));\r\nregisterServiceWorker_1.default();\r\n// React Router :\r\n// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf\r\n//\r\n// BrowserRouter : browser history\r\n// HashRouter : hash history\r\n// MemoryRouter : memory history\r\n// <Route path='/about' component={About} />\r\n// <Route path='/contact' component={Contact} />\r\n// ReactDOM.render(\r\n//     <BrowserRouter>\r\n//         <div>\r\n//             <Route path='/' component={App} />\r\n//         </div>\r\n//     </BrowserRouter>,\r\n//     document.getElementById('app-container')\r\n//   );\r\n",
dependencies: ["react","react-dom","./index.css","./app","./registerServiceWorker"],
sourceMap: {},
headerContent: undefined,
mtime: 1519764429886,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}
