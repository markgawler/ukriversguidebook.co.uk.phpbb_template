module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({

        RemoteHost: process.env.ukrgbRemoteHost,
        RemoteUser: process.env.ukrgbRemoteUser,
        privateKeyFile: process.env.ukrgbPrivateKeyFile,

        copy: {
            // make a copy of the prosilver theme to work with.
            prosilver: {
                expand: true,
                cwd: '../phpbb/phpBB/styles/prosilver/theme/',
                src: ['**'],
                dest: 'prosilver/theme/',
                flatten: false
            },
            images: {
                expand: true,
                src: 'prosilver/theme/images/*',
                dest: 'ukrgb-prosilver/theme/images/',
                flatten: true
            },
            en: {
                expand: true,
                src: 'prosilver/theme/en/*',
                dest: 'ukrgb-prosilver/theme/en/',
                flatten: true
            },
        },

        synchard: {
            remotedest: {
                options: {
                    //args: ['-av'],
                    args: ['-av','--delete'],
                    ssh: true,
                    privateKey: "<%=privateKeyFile%>"
                },
                files: {
                    '<%=RemoteUser%>@<%=RemoteHost%>:/var/www/ukrgb/phpbb/styles/': ['ukrgb-prosilver']
                }
            }
        },

        less: {
            stylesheet: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "ukrgb-prosilver/theme/stylesheet.css": "less/stylesheet.less" // destination file and source file
                }
            },

        },

        watch: {
            styles: {
                files: ['less/**/*.less','ukrgb-prosilver/template/**/*'], // which files to watch
                tasks: ['less','synchard'],
                options: {
                    nospawn: true
                }
            }
        }
    })

    grunt.registerTask('copy-prosilver-files', ['copy']);
    grunt.registerTask('less-and-compress', ['less']);
    grunt.registerTask('default', ['watch']);
};