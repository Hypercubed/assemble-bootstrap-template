assemble-bootstrap-template
===========================

My template for building a static [bootstrap 3.0](http://getbootstrap.com/) site using [grunt](http://gruntjs.com/) and various grunt tasks, including [assemble](http://assemble.io/).

# Installation

	git clone https://github.com/Hypercubed/assemble-bootstrap-template.git
	cd assemble-bootstrap-template
	npm install
	bower install

# Structure

There are many tools, templates, and generators for building static (and non-static) websites.  Each one has their own paradigm for organizing source files.  For example [DocPad] has a `src/` directory containing (at least) thee sub-directories for documents (files to be rendered), files (files not to be rendered), and layouts.  Jekyll on the other-hand has a single source directory containing source files and special sub-directories for layouts, includes, posts, etc.  Each tool has their purpose for using such a layout and their implementation can be very strict or loose depending on the tool.  Assemble on the other-hand imposes not such restrictions.  You are free to organize your source files as you choose.  Using grunt, assemble, and various other grunt tasks your static site is generated from the source files as you see fit.

This template is my way of doing this.  I have organized the source into a single `src/` directory.  This source directory can contains html files, css files, handelbars template files, image files, etc that are processed and transformed into the `out/` directory using a series of grunt tasks (see below).  For the most part the structure of the `out/` directory will mirror the `src/`.  Each file in the `src` directory (with some exceptions) will result in an single a file in the `out/` directory.  Notable exceptions are the `_` directories that are not copied or renderd to the `out/` but instead used during the rendering process by the build tasks.  Each grunt task is fully configurable in `Gruntfile.js` so you can change the structure to fit your needs.

Here is the structure I chose when to use:

	/root
	+- package.json
	+- bower.json
	+- Gruntfile.js
	+- src/
	   +- _data/
	   +- _layouts
	   +- _partials
	   +- bower_components
	   +- {other source files...}

# Grunt tasks

	         clean  Clean files and folders from out/.
	      assemble  Compile template files with specified engines.
	          copy  Copy src/ files, not processed by other tasks, to out/.
	 useminPrepare  Uses HTML markup to determine options for concatenation  and minification tasks.
	        concat  Concatenate js and css files.
	        cssmin  Minify CSS files.
	        uglify  Minify files with UglifyJS.
    	       rev  Prefix static asset file names with a content hash for cache busting.
			usemin  Replaces references to non-minified scripts / stylesheets.
	       htmlmin  Minify HTML.
	        server  Run a test server using src/ and out/ and watch for changes.
	           run  Alias for "clean", "assemble", "server" tasks.
	         build  Alias for "clean", "assemble", "copy", "useminPrepare",
	                "concat", "cssmin", "uglify", "rev", "usemin", "htmlmin" tasks.
	       default  Alias for "server" task.
