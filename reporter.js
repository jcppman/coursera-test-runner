var printCase = process.argv[5] || false;
var path = require('path')
var counter = 0;
exports.testCase = function(desc) {
  console.log('===== Test case # ' + counter++ + '=====')
  if(printCase) {
    console.log(desc)
  }
}
exports.fail = function(expected, actual){
  console.log('===== [Failed] =====')
  console.log('====== Expected =====\n' + expected)
  console.log('===== Actual =====\n' + actual)
}
exports.success = function(testCase){
  console.log('===== [Passed] =====')
}
