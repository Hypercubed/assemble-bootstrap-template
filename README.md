assemble-bootstrap-template
===========================

My template for building a static site using [grunt](http://gruntjs.com/) and various grunt tasks, including [assemble](http://assemble.io/).

# Installation

  git clone https://github.com/Hypercubed/assemble-bootstrap-template.git
  cd assemble-bootstrap-template
  npm install
  bower install

# Background

If you are not familiar it would be worthwhile to read up on [Grunt](https://github.com/gruntjs/grunt/wiki/Getting-started), [bower](http://bower.io/), and [grunt-usemin](https://github.com/yeoman/grunt-usemin), and [assemble](http://assemble.io/).

# Structure

There are many tools, templates, and generators for building static (and non-static) websites.  Each one has their own paradigm for organizing source files.  For example [DocPad](http://docpad.org/) has a `src/` directory containing (at least) three sub-directories; documents (files to be rendered), files (files not to be rendered), and layouts.  Jekyll on the other-hand has a single source directory containing source files and special sub-directories for layouts, includes, posts, etc.  Each tool has their purpose for using such a layout and their implementation can be very strict or loose depending on the tool.  Assemble on the other-hand imposes not such restrictions.  You are free to organize your source files as you choose.  Using grunt, assemble, and various other grunt tasks your static site is generated from the source files as you see fit.  It's as complex or as simple as you need it to be.

This template is my way of doing this.  I have organized the source into a single `src/` directory.  This source directory  contains html files, css files, handelbars template files, image files, etc that are processed and transformed into the `out/` directory using a series of grunt tasks (see below).  For the most part the structure of the `out/` directory will mirror the `src/`.  Each file in the `src` directory (with several exceptions) will result in an single a file in the `out/` directory.  Notable exceptions are the `_` directories that are not copied or rendered to the `out/` but instead used during the build process by the build tasks.  Each grunt task is fully configurable in the `Gruntfile.js` so you can change the structure to fit your needs.

Here is the structure I chose when to use:

	  /root
	  +- package.json
	  +- bower.json
	  +- Gruntfile.js
	  +- src/
	     +- _data/
	     +- _layouts
	     +- _partials
	     +- _bower_components
	     +- {other source files...}

# Grunt

Grunt is a JavaScript based task runner.  In this template Grunt is used for many tasks including template, minification, and even deployment.  If you are not familiar with Grunt please read the [Getting started guide](https://github.com/gruntjs/grunt/wiki/Getting-started).

Grunt tasks:

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
             imagemin  Minify PNG and JPEG images

                rsync  Performs rsync tasks.
             gh-pages  Publish to gh-pages.
         deploy:rsync  Alias for "build", "rsync" tasks.
      deploy:gh-pages  Alias for "build", "gh-pages" tasks.

             server  Run a test server using src/ and out/ and watch for changes.
                run  Alias for "clean", "assemble", "server" tasks.
              build  Alias for "clean", "assemble", "copy", "imagemin", "useminPrepare", "concat", "cssmin", "uglify", "rev", "usemin", "htmlmin" tasks.

               deploy  Alias for "deploy:gh-pages" task.
            default  Alias for "run" task.

# Bower

Bower is a package manager for front end components.  If you are not familiar with Bower see [bower.io](http://bower.io/).  The default template in the `src` directory is designed to use Bootstrap 3.0, angularjs, and angular-bootstrap.  This is easily modified.  The default bower.json file included in this repository installs:

    "modernizr": "~2.6.2",
    "bootstrap": "~3.0.0",
    "jquery": "~2.0.3",
    "angular": "~1.0.8",
    "angular-bootstrap": "~0.6.0"

The bower components are invoked within `src/_layouts/default.hbs`.  You will notice that bower components are wrapped in a usemin block:

    <!-- build:js(src) scripts/vendor.js -->
    <script src="_bower_components/jquery/jquery.js"></script>
    <script src="_bower_components/angular/angular.js"></script>
    <script src="_bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <!-- endbuild -->

This means when the grunt `build` task(s) are invoked these scripts will be concatenated into a single `vendor.js` file in the out directory.  In this way the entire contents of the `_bower_components` directory does not need to be copied to the `out/` directory.  One notable exception is the bootstrap fonts that are copied in the grunt `copy` task.