module.exports = () => {
    $.gulp.task('server', () => {
        $.bs.init({
            notify: false,
            server: {
                baseDir: $.path.serverDir
            }
        })
    })
}