module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                    update: true
                },
                files: {
                    "assets/css/styles.css": "assets/sass/styles.sass"
                }
            }
        },

        concat: {
            dist: {
                src: ['assets/js/canvas_menu.js', 'assets/js/myscript.js'],
                dest: 'assets/js/concat.js',
            }
        },

        // grunt-express will serve the files from the folders listed in `bases` on specified `port` and `hostname`
        express: {
            server: {
              options: {
                port: 9000,
                bases: 'LabMenu'
              }
            }
        },

        // grunt-watch will monitor the projects files
        watch: {
            html: {
                files: '*.html',
            },
            styles: {
                files: ['assets/sass/*.sass', "index.html"],
                tasks: ['sass:dist'],
            },
            scripts: {
                files: ['assets/js/myscript.js', 'assets/js/canvas_menu.js'],
                tasks: ['concat:dist'],
            },
            options: {
                livereload: true
            }
        },

        // Minify all images (except svg)
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/original/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/img/'
                }]
            }
        },

        // Minify svg
        svgmin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/original/',
                    src: ['**/*.{svg}'],
                    dest: 'assets/img/'
                }]
            }
        }
    })

    // Load Grunt tasks declared in the package.json file - AHaH !
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask( 'img', ['imagemin', 'svgmin'] );

    grunt.registerTask('default', [
        'watch'
    ]);
}
