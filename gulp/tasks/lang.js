module.exports = () => {
    $.gulp.task('lang', () => {
        return $.gulp.src($.path.src.lang)
            .pipe($.plugins.include())
            .pipe($.plugins.babel({
                presets: ['@babel/preset-env', 'minify']
            }))
            .pipe($.gulp.dest($.path.build.lang))
            .on('end', $.bs.reload)
    })
}