webpackJsonp(2,{34:function(a,b,c){a.exports={contents:["<h2>What can be done for good &quot;performance&quot; of static resources in a web app?</h2><h3>I. Cache the resources</h3><p>To leverage caching the best your resources should be cached forever. But this results in the problem, that you cannot exchange the resources anymore. So you (or the compiler) name the resources so that their name contains a hash of it&#39;s content. This introduce a bit more complexity: You (or the compiler) have to update all references of the resource if you want to change it.</p><h3>II. Transfer only few files</h3>",'<p>Because the browser limits the connection count to one server and each file has a http overhead, transfering many files (from a single server) is bad. Therefore web sites concat files. This process is really easy for files of the same type (css+css, js+js, not so easy but possible img+img). Approaches for different file type are avalible but more complex (img+css DataUrl, css+js small script).</p><h3>III. Transfer only required files</h3><p>Most web app consist of multiple pages which are never all visible at the same time. Some parts of the resources may not be required for the current page. Downloading only the required parts make the first page faster visible and is so more attractive of the user. <em>How likes a web app, which takes long time to load?</em> Pages which are likely to be used next, can be prefetched by the developer.</p><h3>IV. Compile before serving</h3><p>If you use a template language (i.e. <code>jade</code>) to generate parts of your page, you should compile them before serving them to the client. Three reasons for this: Compiling is a expensive process. It could take some time on weak clients. The compiler may have a bigger size, than the &quot;runtime&quot; needed for executing the compiled templates. It also easier to minimize compiled templates if they are javascript code. The same is true for alternative languages like <code>coffeescript</code> or <code>less</code>.</p><h3>V. Minimize files</h3><p>This saves size. There are good minimizer avalible for many common file types (css, js).</p><h2>Why another CommonJs packager?</h2><p>Existing CommonJs packager did only a part of the points above. The devoloper have to take care of the other points.</p><p>So I developed <a href="https://github.com/sokra/modules-webpack">webpack</a> which should take care of all points above.</p><h2>How webpack support the points</h2><p>Getting <strong>point I</strong> is really easy: The <code>webpack</code> simply add a hash to all output files and automatically take care for the references.</p><p>Getting <strong>point II</strong> is more complex. Like any other packager it can bundle all javascript sources to a single file. But this may not be enougth. There are still stylesheets and images remaining. Stylesheets can be merged into the javascript as a string and applied to the document with a few lines of code. Images can be stored as DataUrl in the stylesheet or the javascript code, but this do not work for all browsers (so it is disabled by default).</p><p>Regarding <strong>point III</strong> there is a conflict with point II. If all stuff is in a single file, there is a lot of unrequired stuff transferred to the client. On big web app this would result in a long initial loading time. <code>webpack</code> solves this by providing a feature named &quot;Code Splitting&quot; (inspired by <a href="http://code.google.com/p/google-web-toolkit/wiki/CodeSplitting">GWT</a>) which splits your single file at by the developer defined split points into multiple files (chunks). If the developer applies a good splitting, his web app only have to download the required stuff and have a short loading time. Each chunk can be cached seperatly.</p><p><strong>Point IV</strong> brings <code>webpack</code> to the point that it will allow &quot;loader&quot; or &quot;preprocessors&quot; to preprocess a file. A &quot;loader&quot; takes some input (in example a <code>jade</code>-template) and do something with it and emits javascript code after that. Multiple loaders can be piped to support complexer operations. A developer can write own loaders which allow to generate javascript code while compiling.</p><p><strong>Point V</strong>. Easy.</p><h2>Additional features</h2><ul><li>debugging support with <code>// @sourceURL=</code></li><li>detailed info about code splitting</li><li>raw, json, jade, coffee, css, less loaders out of the box and bound to file extensions</li><li>bundle loader, which creates a chunk from the file</li><li>file loader, which emits a seperate file to the output and returns the url</li><li>expression in require calls are supported to include a directory of files ( <code>require(&quot;./templates/&quot;+name+&quot;.jade&quot;)</code> )</li><li>shell and programmatically usage</li><li>grunt task avalible</li><li>watch mode</li><li>many config options</li><li>polyfill for node.js to use the techniques (loaders, ...) in native code</li></ul><h2>Tell me more</h2><p><a href="https://github.com/sokra/modules-webpack">read documentation on github</a></p>'],title:"Why another CommonJs packager",tags:"webpack webapp caching optimizing"}}})