module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

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
          sortorder : 'descending'
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
          src     : ['**/*.hbs', '!_pages/**/*.hbs']
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
          './dist/assets/css/main.css': './src/bonnet/sass/main.scss'
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
        files : './src/content/**/*.hbs',
        tasks : ['assemble']
      },
      layout : {
        files : './src/bonnet/**/*.hbs',
        tasks : ['assemble']
      }

    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');

  /* grunt tasks */
  grunt.registerTask('default', ['assemble', 'sass', 'connect' ]);

};
