const gulp = require('gulp');
const unit = require('./tasks/unit');

gulp.task('unit', unit());

gulp.task('default', ['unit']);
