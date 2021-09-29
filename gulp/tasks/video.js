module.exports = () => {
    $.gulp.task('video', () => {
        return $.gulp.src($.path.src.video)
            .pipe($.gulp.dest($.path.build.video))
    })
}