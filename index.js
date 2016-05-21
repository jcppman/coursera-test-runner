#!/usr/bin/env node
var path = require('path')

if (process.argv.length < 4) {
  console.log('USAGE:')
  console.log('  run-test SCRIPT TEST_FOLDER')
  console.log('  run-test SCRIPT1 SCRIPT2 TEST_GENERATOR')
  process.exit(1)
}

if (process.argv.length === 4) {
  require('./folder-test')(
    path.resolve(process.argv[2]),
    path.resolve(process.argv[3])
  )
} else {
  require('./stress-test')(
    path.resolve(process.argv[2]),
    path.resolve(process.argv[3]),
    require(path.join(process.cwd(), process.argv[4]))
  )
}
