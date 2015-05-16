/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({

    includereplace: {
        build: {
            options: {
                includesDir: 'src/includes'
            },
            files: [
                {expand: true, cwd: 'src/pages/', src: '**/*.html', dest: 'dist/', filter: 'isFile'}
            ]
        }
    },
    copy: {
        assets: {
            files: [
                {expand: true, cwd: 'src/assets', src: ['**/*', '!**/*.{js,css}'], dest: 'dist/', filter: 'isFile'}
            ]
        }
    },
    clean: {
        dist: ['dist/'],
        build: ['build/', 'tmp/']
    },
    filerev: {
        build: {
            files: [
                {expand: true, cwd: 'build/', src: '**/*.{css,js}', dest: 'dist/', filter: 'isFile'}
            ]
        }
    },
    useminPrepare: {
        build: {
            files: [
                {expand: true, cwd: 'dist/', src: '**/*.html', filter: 'isFile'}
            ],
            options: {
                dest: 'build/',
                staging: 'tmp/',
                root: 'src/assets/'
            }
        }
    },
    cssmin: {
        options: {
            advanced: false
        }
    },
    usemin: {
        html: {
            files: [
                {src: 'dist/**/*.html', filter: 'isFile'}
            ],
            options: {
              assetsDirs: ['build']
            }
        }
    },
    connect: {
      dev: {
        options: {
          port: 3000,
          base: 'dist/',
          options: {
              index: 'index.html'
          }
        }
      }
    },
    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['build'],
        options: {
          interrupt: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['clean:dist', 'clean:build', 'copy:assets', 'includereplace:build', 'useminPrepare:build', 'concat:generated', 'cssmin:generated', 'uglify:generated', 'filerev:build', 'usemin']);
};
