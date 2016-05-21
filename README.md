# oj-test-runner
JS test cases runner for OJ things.

## Install

- `npm install -g oj-test-runner`

## Usage

### Folder mode

`run-test YOUR_SCRIPT TESTS_FOLDER`

- `YOUR_SCRIPT`: your solution js file
- `TESTS_FOLDER`: folder that contains all test cases

test cases & answers inside folder are formed as:

- `${testCaseNumber}`: test case
- `${testCaseNumber}.a`: expected output

**all intergers are valid, doesn't need to be in sequence**

e.g: folder `tests` contains four files `1`, `1.a`, `2`, `2.a`.

when executing `run-test ./my-solution.js tests`

`tests/1` will be piped to `./my-solution.js`'s stdin and
it's stdout will be used to diff with `1.a` to check if the output is
valid.

then `tests/2` with `tests/2.a`

### Stress test mode

`run-test CORRECT_SOLUTION FAST_SOLUTION TEST_CASE_GENERATOR PRINT_TESTCASE`

- `CORRECT_SOLUTION`: the slow but correct solution script
- `FAST_SOLUTION`: your fast final solution script
- `TEST_CASE_GENERATOR`: a script that exports a function that will generates
a new test case per execution.
- `PRINT_TESTCASE_DESC`: if `true`, print out test case, regarded as `false` if
not given
