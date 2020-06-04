/*
 * @Author: Whzcorcd
 * @Date: 2020-06-02 15:43:30
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-04 15:18:28
 * @Description: file content
 */

const { task, src, dest } = require('gulp')
const babel = require('gulp-babel') // es6 语法解析为 es5
const terser = require('gulp-terser') //压缩
const rename = require('gulp-rename')
// const stripDebug = require('gulp-strip-debug')

const build = task('build', () => {
  return src('./src/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(terser())
    .pipe(rename({ basename: 'rrweb', prefix: 'gdy-', suffix: '.min' }))
    .pipe(dest('./dist'))
})

exports.build = build
