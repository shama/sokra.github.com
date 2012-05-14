module.exports = function(post) {
	var loaderSign = this.request.indexOf("!");
	var requireRequest = this.request.substr(loaderSign);
	var post = this.exec(post);
	post.contents.length = 1;
	var result = [
		"module.exports = ", JSON.stringify(post), ";\n",
		"module.exports.get = function(cb) {\n",
		"	require.ensure([], function(require) {\n",
		"		cb(require(", JSON.stringify(requireRequest), "));\n",
		"	});\n",
		"};"];
	return result.join("");
}
