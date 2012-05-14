var YamYam = require("YamYam");

module.exports = function(source) {
	var cb = this.callback;
	YamYam.parse(source, {
		format: {
			codeContainer: {
				tag: "pre",
				"class": function(buffer, params, element) {
					if(element.language)
						buffer.push("language-" + element.language.replace(/"/g, "&quot;"));
				}
			},
			code: "",
			codeText: "",
			annotations: {
				"@attrs": YamYam.HtmlFormater.ATTRS
			},
			block: false
		},
	}, function(err, blocks) {
		if(err) cb(err);
		var contents = [];
		var data = {
			contents: contents,
		};
		blocks.forEach(function(block) {
			contents.push(block.content);
			block.annotations.forEach(function(annotation) {
				for(var name in annotation.params) {
					data[name] = annotation.params[name];
				}
			});
		});
		cb(null, data && ("module.exports =\n\t" + JSON.stringify(data) + ";"));
	});
}
