/*
 * @Author: Whzcorcd
 * @Date: 2020-06-02 15:43:30
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-06-02 15:43:40
 * @Description: file content
 */ 
const { task, src, dest } = require('gulp')
const babel = require('gulp-babel') // es6 语法解析为 es5
const terser = require('gulp-terser') //压缩
const rename = require('gulp-rename')
const stripDebug = require('gulp-strip-debug')

task('babel', () => {
  return src('./src/*.js')
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(dest('./dist'))
})

const build = task('build', () => {
  return src('./src/*.js')
    .pipe(dest('./dist'))
    .pipe(stripDebug())
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./dist'))
})

exports.build = build
