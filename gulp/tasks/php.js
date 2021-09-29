module.exports = () => {
    $.gulp.task('php', () => {
        return $.gulp.src($.path.src.php)
            .pipe($.gulp.dest($.path.build.php))
    })
}