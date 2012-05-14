require = require("webpack/require-polyfill")(require.valueOf());
module.exports = require("raw!./highlight.pack.js") + ";\nmodule.exports = hljs;";