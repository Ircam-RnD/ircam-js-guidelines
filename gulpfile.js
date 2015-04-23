var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var connect = require('gulp-connect');
var open = require("gulp-open");

var istanbulTraceur = require('istanbul-traceur');

var path = require('path'),
  fs = require('fs'),
  browserify = require('browserify'),
  es6ify = require('es6ify'),
  jsRoot = ".";


gulp.task('es6ify-lib', function(cd) {

  browserify({
      debug: false
    })
    .add(es6ify.runtime)
    .transform(es6ify)
    .require('./index.js', {
      entry: true
    })
    .bundle()
    .on('error', function(err) {
      console.error(err);
    })
    .pipe(fs.createWriteStream('./bundle.js'));

});


gulp.task('es6ify-test', function(cb) {
  browserify({
      debug: false
    })
    .add(es6ify.runtime)
    .transform(es6ify)
    .require('./test/test.js', {
      entry: true
    })
    .bundle()
    .on('error', function(err) {
      console.error(err);
    })
    .pipe(fs.createWriteStream("./foo/tests.js"));
});

fs = require('fs');


gulp.task('test', function(cb) {
  var usedIstanbul = require('istanbul');
  var Instrumenter = usedIstanbul.Instrumenter;

  // Overrides `Instrumenter`
  usedIstanbul.Instrumenter = istanbulTraceur.Instrumenter;

  gulp.src(['index.js'])
    .pipe(istanbul())
    .on('finish', function() {
      console.log('>>>>>>>>>>>>>>>>>>>>')
      //console.log('index.js');
      //fs.readFile('index.js', 'utf8', function(err, data){
      //  console.log(data);
      //})
      gulp.src(['test/test.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', function(err) {
          // Restores original `Instrumenter`
          usedIstanbul.Instrumenter = Instrumenter;
          cb(err);
        });
    });
});

var bistanbul = require('browserify-istanbul');


gulp.task('browser-test', function(cb) {
  var usedIstanbul = require('istanbul');
  var Instrumenter = usedIstanbul.Instrumenter;

  // Overrides `Instrumenter`
  usedIstanbul.Instrumenter = istanbulTraceur.Instrumenter;

  gulp.src(['index.js'])
    .pipe(istanbul())
    .on('finish', function() {
      console.log('>>>>>>>>>>>>>>>>>>>>');
      console.log('>>>>>>', require.resolve('browserify'))
      // here create the test bundle
  browserify({
      debug: false
    })
    .add(es6ify.runtime)
    .transform(bistanbul({instrumenter: new istanbulTraceur.Instrumenter()}))
    .transform(es6ify)
    .require('./test/test.js', {
      entry: true
    })
    .bundle()
    .on('error', function(err) {
      console.error(err);
    })
    .pipe(fs.createWriteStream("./foo/tests.js"));
      /*
      gulp.src(['test/test.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', function(err) {
          // Restores original `Instrumenter`
          usedIstanbul.Instrumenter = Instrumenter;
          cb(err);
        });
      */
    });
});


gulp.task('connect', function() {
  var a = connect.server();
  var options = {
    url: "http://localhost:8080/foo/",
    app: "firefox"
  };
  // the src is for nothing
  gulp.src("README")
    .pipe(open("", options));
  //connect.server.on('connection', function(){console.log('ooooo');});
  //connect.serverClose();
});
