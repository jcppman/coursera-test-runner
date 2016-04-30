#!/usr/bin/env node

var path = require('path')
var fork = require('child_process').fork
var fs = require('fs')

var glob = require('glob')
var async = require('async')

var script = path.resolve(process.argv[2])
var folder = path.resolve(process.argv[3])

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
  var child = fork(script, [], {
    silent: true
  })
  var result = ''
  var answer = fs.readFileSync(file + '.a').toString().trim()
  fs.createReadStream(file).pipe(child.stdin)
  child.stdout.on('data', function(data){
    result += data.toString()
  })
  child.stdout.on('end', function(){
    result = result.trim()
    var pass = result === answer
    if (pass) {
      console.log('Test case', path.basename(file), '[Passed]')
    } else {
      console.log('Test case', path.basename(file), '[Failed]')
      console.log('Expected:\n', answer)
      console.log('Actual:\n', result)
    }
    done(pass ? null : path.basename(file))
  })
})
