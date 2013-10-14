assemble-bootstrap-template
===========================

My template for building a static [bootstrap 3.0](http://getbootstrap.com/) site using [grunt](http://gruntjs.com/) and various grunt tasks, including [assemble](http://assemble.io/).

# Installation

```
git clone https://github.com/Hypercubed/assemble-bootstrap-template.git
cd assemble-bootstrap-template
npm install
bower install
```

# Grunt tasks

```
          copy  Copy src/ files, not processed by assemble, to out/.
         clean  Clean files and folders from out/.
      assemble  Compile template files with specified engines.
        server  Run a test server using src/ and out/ and watch for changes.
           run  Alias for "clean", "assemble", "server" tasks.
         build  Alias for "clean", "assemble", "copy", "useminPrepare",
                "concat", "cssmin", "uglify", "usemin", "htmlmin" tasks.
       default  Alias for "server" task.
```
