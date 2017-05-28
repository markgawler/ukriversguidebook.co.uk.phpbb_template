module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({

        copy: {
            // make a copy of the prosilver theme to work with.
            prosilver: {
                expand : true,
                cwd : '../phpbb/phpBB/styles/prosilver/theme/',
                src : ['**'],
                dest : 'prosilver/theme/',
                flatten : false
            },
            images: {
                expand : true,
                src : 'prosilver/theme/images/*',
                dest : 'ukrgb-prosilver/theme/images/',
                flatten : true
            },
            en: {
                expand : true,
                src : 'prosilver/theme/en/*',
                dest : 'ukrgb-prosilver/theme/en/',
                flatten : true
            },
        },


    });

    grunt.registerTask('default', ['copy']);
};