webpackJsonp(1,{30:function(a,b,c){a.exports={contents:['<p>Hello,</p><p>I am proud to introduce my new blog.</p><p>It&#39;s totally build on <a href="https://github.com/sokra/modules-webpack">webpack</a> and posts are compiled with <a href="https://github.com/sokra/YamYam">YamYam</a> markdown.</p><p>Here are more details about how it works: (and you can see the <a href="https://github.com/sokra/sokra.github.com">source</a>)</p>','<p>I wanted to host by blog on Github, so one restriction was that no server side components can exist. Using Jekyll is too standard and it should be a javascript-based page. And I need a usecase for <a href="https://github.com/sokra/modules-webpack">webpack</a> and <a href="https://github.com/sokra/YamYam">YamYam</a>.</p><p>The blog&#39;s code is really simple: <br/>It just creates a <code>require.context</code> of the posts in a specific folder. The posts are preprocessed by a own loader. The loader emits meta info of each post and offers a method to load the whole content of the post which <code>require.ensure</code>. So webpack&#39;s Code Splitting do the work.<br/>The main code enumerates all files in the context and build the view from a few <code>jade</code>-templates. <a href="http://benalman.com/projects/jquery-hashchange-plugin/">jQuery hashchange</a> listens for the navigation, and bootstrap make the styling.</p><h2>Some code</h2><p>Here is an example of a post file:</p><p><code>2012-05-14-hash-for-the-post-in-url.yam</code></p><pre class="">[post title=&quot;The title of the post]<br/><br/>Some content.<br/><br/>[more]<br/><br/>Some details.</pre><p>This is processed by a own loader which extracts info from the file and put it into a JSON structure. A second loader generates code that contains a part of the meta data and a function which loads the remaining content via <code>require.ensure</code>. (The val loader is only needed to get the value of the javascript code)</p><pre class="language-javascript">// in main code:<br/>var posts = require.context(&quot;./bundlePost!./yamyam!../blog-posts&quot;);<br/>var postNames = posts.keys().slice(0).sort().reverse();</pre><h3>The <code>bundlePost.loader.js</code> loader</h3><p>It is so small, I can include the complete file:</p><pre class="language-javascript">module.exports = function(post) {<br/>	var loaderSign = this.request.indexOf(&quot;!&quot;);<br/>	var requireRequest = this.request.substr(loaderSign);<br/>	var post = this.exec(post);<br/>	post.contents.length = 1; // remove nearly all content<br/>	var result = [<br/>		&quot;module.exports = &quot;, JSON.stringify(post), &quot;;\\n&quot;,<br/>		&quot;module.exports.get = function(cb) {\\n&quot;,<br/>		&quot;	require.ensure([], function(require) {\\n&quot;,<br/>		&quot;		cb(require(&quot;, JSON.stringify(requireRequest), &quot;));\\n&quot;,<br/>		&quot;	});\\n&quot;,<br/>		&quot;};&quot;];<br/>	return result.join(&quot;&quot;);<br/>}</pre><h2>Future tasks</h2><p>I want to integrate tags for each post and show them in the list. This should be a easy task as any meta data can be integrated into the yamyam markdown.</p>'],title:"My new blog",tags:"webpack github bootstrap javascript blog coding"}}})