module.exports = {
    gulp: require('gulp'),
    plugins: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),
    dev: process.argv.pop() === 'dev',
    path: {
        serverDir: './app/dist',
        tasks: require('./gulp/config/index'),
        src: {
            html: ['./app/src/**/*.{html,pug,jade}', '!./app/src/_*.{html,pug,jade}'],
            css: './app/src/style/main.scss',
            js: './app/src/js/*.js',
            font: './app/src/fonts/**/*.ttf',
            img: './app/src/images/**/*.{gif,jpg,jpeg,png,webp,svg}',
            includes: './app/src/includes/**/*.*',
            lang: './app/src/lang/**/*.*',
            php: './app/src/**/*.php',
            video: './app/src/**/*.{mp4,mpeg4,avi}',
        },
        build: {
            html: './app/dist/',
            css: './app/dist/css/',
            js: './app/dist/js/',
            font: './app/dist/fonts/',
            img: './app/dist/images/',
            includes: './app/dist/includes/',
            lang: './app/dist/lang/',
            php: './app/dist/',
            video: './app/dist/'
        },
        watch: {
            html: ['./app/src/*.{html,pug,jade}', './app/src/components/*.{html,pug,jade}'],
            css: './app/src/style/**/*.scss',
            js: './app/src/js/*.js',
            font: './app/src/fonts/*.*',
            img: './app/src/images/**/*.*',
            lang: './app/src/lang/**/*.*'
        }
    }
}