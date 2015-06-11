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
        layout    : './src/bonnet/layouts/article.hbs',
        helpers   : './src/bonnet/helpers/**/*.js',
        partials  : './src/bonnet/partials/**/*'
      },
      testing: {
        options : {
          layout    : './src/bonnet/layouts/article.hbs',
        },
        files: [{
          cwd     : './src/content/blog',
          dest    : './dist/blog',
          expand  : true,
          src     : ['**/*.md']
        }]
      },
      pages : {
        options : {
          layout    : './src/bonnet/layouts/page.hbs',
        },
        files: [{
          cwd     : './src/content/_pages',
          dest    : './dist',
          expand  : true,
          src     : ['**/*.hbs']
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
        files : './src/content/**/*.md',
        tasks : ['assemble']
      },
      pages : {
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
