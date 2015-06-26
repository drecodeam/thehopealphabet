module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  var paths = {
    sourceBase   : './src',
    buildBase    : './dist',
    sourceAssets : './src/bonnet',
    buildAssets  : './dist/assets',
    postsSource  : './src/content/blog',
    postsBuild   : './dist/blog',
    pagesSource  : './src/content/_pages',
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON( './package.json' ),
    paths : paths,
    connect: {
      dev: {
        options: {
          port: 8000,
          base: './dist/',
          keepalive: true
        }
      }
    },
    metalsmith: {
      staticSiteExample: {
        options: {
          metadata: {
            title: 'The hope alphabet'
          },
          plugins: {
            'metalsmith-markdown': {
              "gfm": true,
            },
            'metalsmith-partial' : {
              engine : 'handlebars',
              directory : '<%= paths.sourceAssets %>/partials'
            },
            'metalsmith-templates': {
              engine: 'handlebars',
              directory : '<%= paths.sourceAssets %>/templates'
            },
            "metalsmith-collections": {
              "articles": {
                "pattern": '<%= paths.postsSource %>/*.md',
                "sortBy": "date",
                "reverse": true
              }
            },
          }
        },
        src: paths.sourceBase,
        dest: paths.buildBase
      }
    },
    // SASS compiling
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= paths.buildAssets %>/css/main.css': '<%= paths.sourceAssets %>/sass/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: '<%= paths.sourceAssets %>/sass/*.scss',
        tasks: ['sass'],
      },
      posts : {
        files : paths.postsSource,
        tasks : ['assemble']
      },
      pages : {
        files : paths.pagesSource,
        tasks : ['assemble']
      },
      layout : {
        files : '<%= paths.sourceAssets %>/layouts/**/*.hbs',
        tasks : ['assemble']
      },
      grunt: {
          files: ['Gruntfile.js']
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('assemble');

  /* grunt tasks */
  grunt.registerTask('default', ['assemble', 'sass', 'connect' ]);

};
