'use strict';

var mount = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  
  grunt.initConfig({

    clean: {
      all: ['.sass-cache', 'build'],
      before_deploying: ['build/index.html'],
      post_build: ['.sass-cache', 'npm-debug.log', 'build/.tmp']
    },

    concat: {      
      /*js: {
        src: [
          'src/vendor/js/jquery.js'
        ],
        dest: 'build/js/app.js'
      },*/
      css: {
        src: [
          'src/vendor/css/reset.css',
          'src/vendor/css/lemonade.css',
          'build/.tmp/main.css'
        ],
        dest: 'build/css/app.css'
      }
    },
    
    copy: {
      build: {
        files: [
          //{expand: true, cwd: 'src/', src: ['favicon.ico'], dest: 'build/'},
          {expand: true, cwd: 'src/fonts/', src: ['**'], dest: 'build/css/fonts/'},
          {expand: true, cwd: 'src/img/', src: ['**'], dest: 'build/img/'},
        ]
      }
    },

    replace: {
      dist: {
        options: {
          variables: {
            'timestamp': '<%= new Date().getTime() %>'
          }
        },
        files: [
          {src: ['src/index.html'], dest: 'build/index.html'}
        ]
      },
      deploy: {
        options: {
          variables: {
            'timestamp': '<%= new Date().getTime() %>'
          }
        },
        files: [
          {src: ['src/index.html'], dest: 'build/index.html'}
        ]
      },
    },

    sass: {
      development: {
        files: {
          'build/.tmp/main.css' : [
            'src/sass/main.scss'
          ]
        },
        options: {
          style: 'expanded'
        }
      },
      release: {
        files: {
          'build/.tmp/main.css' : [
            'src/sass/main.scss'
          ]
        },
        options: {
          style: 'compressed'
        }
      }
    },

    watch : {
      src: {
        files: ['Gruntfile.js', 'src/**'],
        tasks: ['build'],
        options: {
          livereload: true,
        }
      }
    }
    
  });
  
  grunt.registerTask('build', [
    'clean:all',
    'copy:build',
    'sass:development',
    'concat',
    'replace:dist',
    'clean:post_build'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
}
