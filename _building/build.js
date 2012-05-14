require = require("webpack/require-polyfill")(require.valueOf());

var webpack = require("webpack");
var path = require("path");

var live = /gh-pages/.test(require("raw!../.git/HEAD"));
var prefix = live ? "" : "test-";

var base = path.join(__dirname, "..");

var config = {
	input: "./blog-lib/index.js",
	output: "blog/" + prefix + "asserts/[hash].js",
	publicPrefix: prefix + "asserts/",
	watch: true,
	watchDelay: 100,
	minimize: live,
};

webpack(base, config.input, config, function(err, data) {
	if(err) throw err;
	console.log(require("webpack/lib/formatOutput")(data, {colors: true}));
	var page = require(base+"/blog-lib/index.jade")({js: prefix+"asserts/"+data.hash+".js"});
	require("fs").writeFile(path.join(base, "blog/"+prefix+"index.html"), page, "utf-8", function(err) {
		console.log("Ok");
	});
});