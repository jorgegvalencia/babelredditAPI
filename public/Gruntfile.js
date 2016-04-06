module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            app: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'dist/'
                }]
            }
        },

        'string-replace': {
            dist: {
                options: {
                    replacements: [{
                        pattern: /["']ngInject["'];*/g,
                        replacement: ''
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: '**/*.js',
                    dest: 'dist/'
                }]
            }
        },

        concat: {
            options: {
                separator: '\n;',
                process: false,
                stripBanners: {
                    block: true
                }
            },
            app: {
                src: [
                    'bower_components/moment/moment.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'dist/**/*.js',
                    'dist/*.js'
                ],
                dest: 'dist/app.js'
            },
            dev: {
                src: [
                    'bower_components/moment/moment.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'src/**/*.js',
                    'src/*.js'
                ],
                dest: 'dist/app.js'
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            built: {
                files: {
                    'dist/app.min.js': ['dist/app.js']
                }
            }
        },

        less: {
            build: {
                files: {
                    "dist/style.css": "less/style.less",
                }
            }
        },

        watch: {
            js: {
                files: ['src/**/*.js', 'src/*.js'],
                tasks: ['concat:dev']
            },
            less: {
                files: ['less/**.less'],
                tasks: ['less']
            }
        }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-string-replace');

    // default task(s).
    grunt.registerTask('default', ['less', 'concat:dev', 'watch']);
    //grunt.registerTask('prod', ['less', 'concat', 'uglify']);
    grunt.registerTask('prod', ['less', 'ngAnnotate','string-replace', 'concat:app', 'uglify']);

};
