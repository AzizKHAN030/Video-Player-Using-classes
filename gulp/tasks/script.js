module.exports = () => {
    $.gulp.task('js', () => {
        return $.gulp.src($.path.src.js)
            .pipe($.plugins.plumber())
            .pipe($.plugins.include())
            .pipe($.plugins.babel({
                presets: ["@babel/preset-env", ['minify', {
                    builtIns: false
                }]]
            }))
            .pipe($.plugins.rename({
                extname: '.min.js',
            }))
            .pipe($.gulp.dest($.path.build.js))
            .on('end', $.bs.reload)
    })
}