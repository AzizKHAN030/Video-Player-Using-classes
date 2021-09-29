module.exports = () => {
    $.gulp.task('img', () => {
        return $.gulp.src($.path.src.img)
        .pipe($.plugins.imagemin([
            $.plugins.imagemin.mozjpeg({quality: 75, progressive: true}),
            $.plugins.imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe($.plugins.webp())
        .pipe($.gulp.dest($.path.build.img))
        .on('end', $.bs.reload)
    })
}