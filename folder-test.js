var path = require('path')
var glob = require('glob')
var async = require('async')
var fs = require('fs')
var fork = require('child_process').fork
var reporter = require('./reporter')

module.exports = function(script, folder) {
  if (!fs.statSync(script).isFile()) {
    console.error(
      'script not found, please check your path\n' +
      'script', script
    )
  }

  var files = glob.sync(path.join(folder, '+([0-9])'))

  if (files.length === 0) {
    console.error(
      'files not found, please check your path\n' +
      'folder', folder
    )
  }

  async.eachSeries(files, function(file, done){
    reporter.testCase(file)
    var child = fork(script, [], {
      silent: true
    })
    var result = ''
    var answer = fs.readFileSync(file + '.a').toString().trim().replace(/\r/g, '')
    fs.createReadStream(file).pipe(child.stdin)
    child.stdout.on('data', function(data){
      result += data.toString()
    })
    child.stdout.on('end', function(){
      result = result.trim().replace(/\r/g, '')
      var pass = result === answer
      if (pass) {
        reporter.success()
      } else {
        reporter.fail(answer, result)
      }
      done(pass ? null : path.basename(file))
    })
  })
}
