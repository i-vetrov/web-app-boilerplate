module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      buildPath: 'BUILD',
      srcPath: 'src',
      tempPath: 'TEMP',
      jsBuildPath: '<%= buildPath %>/www/js',
      cssBuildPath: '<%= buildPath %>/css',

      watch: {
        files: ['<%= srcPath %>/**/*.*', 'Gruntfile.js'],
        tasks: ['dev']
      },

      clean: {
        build: ['<%= buildPath %>'],
        temp: ['<%= tempPath %>']
      },

      jshint: {
        test: {
          src: ['<%= srcPath %>/www/app/app.js', '<%= srcPath %>/www/app/controllers/*.js'],
          options: {
            predef: ['$', 'angular', 'Firebase', 'console', 'spinner', 'geoLocation', 'google'],
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            boss: true,
            eqnull: true,
            browser: true,
            globals: {
              require: true,
              define: true,
              requirejs: true,
              describe: true,
              expect: true,
              it: true
            }
          }
        }
      },

      sass: {
          dev: {
            options: {
              style: 'expanded'
            },
            files: {
              '<%= buildPath %>/www/style/style.css': '<%= srcPath %>/www/scss/style.scss'
            }
          },
          prod: {
            options: {
              style: 'compressed'
            },
            files: {
              '<%= buildPath %>/www/style/style.css': '<%= srcPath %>/www/scss/style.scss'
            }
          }
      },

      concat: {
        prod: {
          src: ['<%= srcPath %>/www/app/app.js', '<%= srcPath %>/www/app/controllers/*.js'],
          dest: '<%= buildPath %>/www/app/app.js'
        }
      },

      htmlbuild: {
        dev: {
          src: '<%= srcPath %>/www/index.html',
          dest: '<%= buildPath %>/www/',
          options: {
            relative: true,
            scripts: {
              libs: [
                '<%= buildPath %>/www/js/lib/jquery.min.js',
                '<%= buildPath %>/www/js/lib/jquery-ui.min.js',
                '<%= buildPath %>/www/js/lib/angular.min.js',
                '<%= buildPath %>/www/js/lib/angular-route.min.js'
              ],
              app: '<%= buildPath %>/www/app/app.js',
              controllers: '<%= buildPath %>/www/app/controllers/*.js'
            },
            styles: {
              scss: '<%= buildPath %>/www/style/style.css'
            }
          }
        },
        prod: {
          src: '<%= srcPath %>/www/index.html',
          dest: '<%= buildPath %>/www/',
          options: {
            relative: true,
            scripts: {
              libs: [
                '<%= buildPath %>/www/js/lib/jquery.min.js',
                '<%= buildPath %>/www/js/lib/jquery-ui.min.js',
                '<%= buildPath %>/www/js/lib/angular.min.js',
                '<%= buildPath %>/www/js/lib/angular-route.min.js'
              ],
              app: '<%= buildPath %>/www/app/app.js',
              controllers: 'dummy.js'
            },
            styles: {
              scss: '<%= buildPath %>/www/style/style.css'
            }
          }
        }
      },

      copy: {
        dev: {
          files: [
            {src: ['<%= srcPath %>/www/img/*'], dest: '<%= buildPath %>/www/img/', expand: true, flatten: true, filter: 'isFile'},
            {src: ['<%= srcPath %>/www/js/lib/*'], dest: '<%= buildPath %>/www/js/lib', expand: true, flatten: true, filter: 'isFile'},
            {src: ['<%= srcPath %>/www/app/app.js'], dest: '<%= buildPath %>/www/app', expand: true, flatten: true, filter: 'isFile'},
            {src: ['<%= srcPath %>/www/app/controllers/*.js'], dest: '<%= buildPath %>/www/app/controllers', expand: true, flatten: true, filter: 'isFile'},
            {src: ['<%= srcPath %>/www/app/views/*.html'], dest: '<%= buildPath %>/www/app/views', expand: true, flatten: true, filter: 'isFile'}
          ]
        },
        prod: {
          files: [
            {src: ['<%= srcPath %>/www/img/*'], dest: '<%= buildPath %>/www/img/', expand: true, flatten: true, filter: 'isFile'},
            {src: ['<%= srcPath %>/www/js/lib/*'], dest: '<%= buildPath %>/www/js/lib', expand: true, flatten: true, filter: 'isFile'},
            {src: ['<%= srcPath %>/www/app/views/*.html'], dest: '<%= buildPath %>/www/app/views', expand: true, flatten: true, filter: 'isFile'}
          ]
        }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('cleaning', ['clean:build', 'clean:temp']);
  grunt.registerTask('dev', ['cleaning', 'jshint:test', 'sass:dev', 'copy:dev', 'htmlbuild:dev']);
  grunt.registerTask('prod', ['cleaning', 'jshint:test', 'sass:prod', 'concat:prod', 'copy:prod', 'htmlbuild:prod']);

};
