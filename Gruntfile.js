'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    build: {
      src: 'src',
      out: 'out',
      dist: 'dist'
    },
    watch: {
      src: {
        files: ['<%= build.src %>/**/*.{html,htm,js,css}'],
        options: { livereload: true }
      },
      assemble: {
        files: [
          '<%= assemble.pages.src %>',
          '<%= assemble.options.layoutdir %>/*.hbs',
          '<%= assemble.options.data %>',
          '<%= assemble.options.partials %>'
        ],
        tasks: ['clean:out','assemble:pages'],
        options: { livereload: true }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: ['<%= build.src %>','<%= build.out %>'],
          livereload: true,
          open: true
        }
      }
    },
    assemble: {
      options: {
        flatten: false,
        partials: '<%= build.src %>/_partials/*.hbs',
        layoutdir: '<%= build.src %>/_layouts',
        data: ['<%= build.src %>/_data/*.{json,yml}', 'package.json'],
        assets: '<%= build.out %>/'
      },
      pages: {
        options: {
          layout: 'page.hbs',
        },
        expand: true,
        cwd: '<%= build.src %>/',
        src: ['**/*.hbs','!_*/**'],
        dest: '<%= build.out %>/'
      }
    },
    clean: {
      options: { force: false },
      out: ['<%= build.out %>/*']
    },
    copy: {
      src: {
        expand: true,
        cwd: '<%= build.src %>/',
        src: [
          '**',
          '!**/*.hbs',
          '!_*/**',
          '.htaccess'
        ],
        dest: '<%= build.out %>/'
      },
      fonts: {
        expand: true,
        cwd: '<%= build.src %>/_bower_components/bootstrap/fonts/',
        src: [
          '**',
        ],
        dest: '<%= build.out %>/fonts/'
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= build.out %>'
      },
      html: '<%= build.out %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= build.out %>']
      },
      html: ['<%= build.out %>/**/*.html'],
      css: ['<%= build.out %>/styles/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          //removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          //removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= build.out %>',
          src: '**/*.html',
          dest: '<%= build.out %>'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= build.src %>/images',
          src: '**/*.{png,jpg,jpeg,gif,webp}',
          dest: '<%= build.out %>/images'
        }]
      }
    },
    //svgmin: {
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '<%%= build.src %>/images',
    //      src: '{,*/}*.svg',
    //      dest: '<%%= build.out %>/images'
    //    }]
    //  }
    //},
    jshint: {
      options: {jshintrc: '.jshintrc'},
      files: [
        'Gruntfile.js',
        'src/scripts/*.js'
      ]
    },
    rev: {
      files: {
        src: [
          '<%= build.out %>/scripts/{,*/}*.js',
          '<%= build.out %>/styles/{,*/}*.css'
        ]
      }
    },
    //less: {
    //  styles: {
    //    files: {
    //      '<%= build.out %>/styles/**/*.*': ['<%= build.src %>/styles/**/*.less']
    //    }
    //  }
    //},
    //'bower-install': {
    //  target: {
    //    html: 'out/index.html' // point to your HTML file.
    //  }
    //},
    'gh-pages': {
      options: {
        base: 'out',
        branch: 'gh-pages'
      },
      src: ['**/*']
    },
    rsync: {
      options: {
        args: ["--verbose","--delete"],
        recursive: true
      },
      dist: {
          options: {
            src: "<%= build.out %>/",
            dest: "<%= build.dist %>"
          }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-rsync');
  //grunt.loadNpmTasks('assemble-less');

  grunt.registerTask('server', ['connect','watch']);
  grunt.registerTask('run', ['clean','assemble','server']);
  grunt.registerTask('run:build', ['build','server']);
  //grunt.registerTask('build', ['clean','assemble','copy']);

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'copy',
    'imagemin',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('deploy:rsync', ['build','rsync']);
  grunt.registerTask('deploy:gh-pages', ['build','gh-pages']);

  grunt.registerTask('deploy', ['deploy:gh-pages']);
  grunt.registerTask('default', ['run']);

};
