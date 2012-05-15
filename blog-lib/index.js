require("es5-shim");
var $ = require("jquery");
require("jquery-hashchange");
var hljs = require("highlight.js");

var posts = require.context("./bundlePost!./yamyam!../blog-posts");
var postNames = posts.keys().slice(0).sort().reverse();

function postNameToHash(name) {
	return name.slice(2, name.length - 4);
}

function hashToDate(hash) {
	return hash.substring(0, 10);
}

$(function() {
	// load html
	$("body").html(require("./body.jade")());
	
	// fill posts list
	postNames.slice(0, 20).map(postNameToHash)
	.forEach(function(name) {
		var post = posts("./"+name+".yam");
		$("<a>").attr("href", "#" + name).text(post.title)
			.appendTo($("<li>").attr("data-hash", name).appendTo(".posts-nav"));
		$("<a>").attr("href", "#" + name).text(post.title)
			.appendTo($("<li>").attr("data-hash", name).appendTo(".posts-sidebar"));
	});
	
	// dropdown
	$(".navbar .dropdown .dropdown-toggle").dropdown();
	
	$(window).hashchange(function() {
		var hash = window.location.hash.replace(/^#/, "");
		switch(hash) {
		case "list": 
			$(".page").html(
				require("./posts-list.jade")({
					posts: posts, 
					names: postNames,
					nameToHash: postNameToHash
				}));
			document.title = "sokra's blog - posts";
			break;
		default:
			var post;
			try {
				post = posts("./" + hash + ".yam");
			} catch(e) {
				post = posts(postNames[0]);
				hash = postNameToHash(postNames[0]);
			}
			document.title = "sokra's blog - " + post.title;
			var page = $(".page").html(require("./post.jade")({
				post: post,
				hash: hash,
				hashToDate: hashToDate
			}));
			page.find("pre").each(function() {
				hljs.highlightBlock(this);
			});
			var contentEl = page.find(".content");
			post.get(function(post) {
				contentEl.html(post.contents.slice(1).join(""));
				contentEl.find("pre").each(function() {
					hljs.highlightBlock(this);
				});
			});
			window.gapi && gapi.plusone && gapi.plusone.go && gapi.plusone.go();
			window.twttr && twttr.widgets && twttr.widgets.load && twttr.widgets.load();
		}
		$("[data-hash]").removeClass("active");
		$("[data-hash]").each(function(idx, item) {
			if($(item).attr("data-hash") == hash)
				$(item).addClass("active");
		});
		$(window).scrollTop(0);
		window._gaq.push(['_trackPageview', '/blog/' + hash]);
	});
	$(window).hashchange();
});

var _gaq = window._gaq = window._gaq || [];
_gaq.push(['_setAccount', 'UA-31723863-1']);

function addScript(src) {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = src;
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
}

addScript("https://apis.google.com/js/plusone.js");
addScript("http://platform.twitter.com/widgets.js");
addScript('http://www.google-analytics.com/ga.js');
