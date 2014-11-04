module.exports = function(grunt) {

    // Configuration 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {                    // Task
            dist: {                   // Target
                options: {            // Target options
                    sassDir: ['scss'],
                    cssDir: ['css'],
                    environment: 'production'
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'js/enhance.min.js': 'js/src/enhance.js'
                }
            }
        },
        shell: {
            dexy: {
                command: 'dexy'
            }
        },
        watch: {
            scss: {
                files: ['scss/**/*.scss','scss/**/_*.scss','scss/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: true 
                }
           },
           js: {
                files: 'js/src/*.js',
                tasks: ['uglify'],
                options: {
                    spawn: true 
                }
           },
           dexy: {
               files: ['css/*.css', 'css/**/*.css', '**/*.html', '*.html', '*.markdown', '*.md'],
               tasks: ['shell:dexy']
           }

        }
    });

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-compass');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-perfbudget');

    // Tasks
    grunt.registerTask('default', ['watch']);
    };
