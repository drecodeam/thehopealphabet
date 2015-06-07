module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});

  grunt.initConfig({
    pkg: grunt.file.readJSON( './package.json' ),

    connect: {
      dev: {
        options: {
          port: 8000,
          base: './dist/',
          keepalive: true
        }
      }
    },

    /* assemble templating */
    assemble: {
      options: {
        collections: [{
          name      : 'post',
          sortby    : 'posted',
          sortorder : 'descending',
          engine : 'Handlebars'
        }],
        helpers   : './src/bonnet/helpers/**/*.js',
        layout    : 'page.hbs',
        layoutdir : './src/bonnet/layouts/',
        partials  : './src/bonnet/partials/**/*'
      },
      posts: {
        files: [{
          cwd     : './src/content/',
          dest    : './dist/',
          expand  : true,
          src     : ['**/*.md', '!_pages/**/*.md']
        }, {
          cwd     : './src/content/_pages/',
          dest    : './dist/',
          expand  : true,
          src     : '**/*.hbs'
        }]
      }
    },
    // SASS compiling
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          './dist/assets/css/main.css': './src/bonnet/sass/main.scss',
          './dist/assets/css/cupcake.css': './src/bonnet/sass/cupcake.scss'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          './dist/assets/js/source.min.js': ['./src/bonnet/js/source/**/*.js'],
          './dist/assets/js/vendor.min.js': ['./src/bonnet/js/vendor/**/*.js']
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "rednotebook"
        },
        files: {
          "./dist/assets/templates/template.js": "./src/bonnet/template/**/*.hbs",
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: './src/bonnet/sass/*.scss',
        tasks: ['sass'],
      },
      posts : {
        files : './src/content/**/*.md',
        tasks : ['assemble']
      },
      layout : {
        files : [ './src/bonnet/layouts/**/*.hbs', './src/bonnet/partials/**/*.hbs' ],
        tasks : ['assemble']
      },
      js : {
        files : './src/bonnet/js/**/*.js',
        tasks : ['uglify']
      },
      handlebars : {
        files : './src/bonnet/template/**/*.hbs',
        tasks : ['handlebars']
      }
    }
  });

  /* grunt tasks */
  grunt.registerTask('default', ['assemble', 'sass', 'connect' ]);

};
