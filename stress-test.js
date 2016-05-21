var fork = require('child_process').fork
var reporter = require('./reporter')
var async = require('async')

module.exports = function (script1, script2, caseGenerator) {
  async.forever(function(next){
    var testCase = caseGenerator()
    reporter.testCase(testCase);
    async.map([script1, script2], function(script, done){
      var child = fork(script, [], {
        silent: true
      })
      var result = ''
      var err = ''
      child.stdin.write(testCase)
      child.stdin.end()
      child.stdout.on('data', function(data) {
        result += data.toString()
      });
      child.stderr.on('data', function(data) {
        err += data.toString()
      })
      child.on('close', function(){
        done(err, result.trim().replace(/\r/g, ''))
      })
    }, function (err, result) {
      if(err) {
        console.error(err);
      }
      if(result[0] !== result[1]) {
        reporter.fail(result[0], result[1])
        next('dead')
      } else {
        reporter.success()
        next(null)
      }
    })
  })
}
