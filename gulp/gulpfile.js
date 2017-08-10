var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-clean-css'),
    spriter = require('gulp-css-spriter');

gulp.task('jsmin', function(){
    gulp.src('js/common.js')
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('imgmin',function(){
    gulp.src('image/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'));
})

gulp.task('cssmin', function(){
    gulp.src('css/*.css')
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('es6toes5', function(){
    gulp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
})

gulp.task('sprite', function(){
    gulp.src('./css/main.css')
        .pipe(spriter({
            'spriteSheet': './dist/images/spritersheet.png',
            'pathToSpriteSheetFromCSS': '../images/spritersheet.png'
        }))
        .pipe(gulp.dest('./dist/css'));
})

//定义监控任务
gulp.task('watchTask', function () {
    gulp.watch('./image/*.png', ['imgmin']);
    gulp.watch('./image/*.jpg', ['imgmin']);
    gulp.watch('./js/*.js', ['es6Toes5']);
    gulp.watch('./css/*.less', ['lessTask']); //当所有less文件发生改变时，调用testLess任务
});