module.exports = () => {
    $.gulp.task('includes', () => {
        return $.gulp.src($.path.src.includes)
            .pipe($.gulp.dest($.path.build.includes))
    })
}