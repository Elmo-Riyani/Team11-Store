/**
 * Team Project - automate.js
 * Team Members:
 * Adam Jama
 * Ricardo Sylvestre
 * Elmotasembella Riyani
 */

const fs = require('fs');
const path = require('path');
const { runCLI } = require('jest');

const testsDirectory = path.join(__dirname, 'tests');
const readableResultPattern = /.+ - .+ - \d+ - (PASSED|FAILED)/;

function getTestFiles() {
  return fs.readdirSync(testsDirectory)
    .filter((file) => file.endsWith('.test.js'))
    .map((file) => path.join(testsDirectory, file));
}

function extractReadableLines(output) {
  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => readableResultPattern.test(line));
}

function runTestFile(testFile) {
  const originalLog = console.log;
  const originalError = console.error;
  const stdout = [];
  const stderr = [];

  console.log = (...args) => {
    stdout.push(args.join(' '));
  };

  console.error = (...args) => {
    stderr.push(args.join(' '));
  };

  return runCLI({
    $0: 'automate.js',
    _: [testFile],
    runInBand: true,
    runTestsByPath: true,
    noStackTrace: true,
    silent: false
  }, [__dirname])
    .then((result) => {
      console.log = originalLog;
      console.error = originalError;

      return {
        code: result.results.success ? 0 : 1,
        stdout: stdout.join('\n'),
        stderr: stderr.join('\n'),
        testFile
      };
    })
    .catch((error) => {
      console.log = originalLog;
      console.error = originalError;

      return {
        code: 1,
        stdout: stdout.join('\n'),
        stderr: error.message,
        testFile
      };
    });
}

async function runSequentially() {
  const testFiles = getTestFiles();

  if (!testFiles.length) {
    console.error('No test files were found in the tests folder.');
    process.exitCode = 1;
    return;
  }

  console.log('Running Team 11 Store tests sequentially...\n');

  let hasFailures = false;

  for (const testFile of testFiles) {
    const fileName = path.basename(testFile);
    console.log(`Test File: ${fileName}`);

    const { code, stdout, stderr } = await runTestFile(testFile);
    const readableLines = extractReadableLines(stdout);

    if (readableLines.length) {
      readableLines.forEach((line) => console.log(line));
    } else if (stdout.trim()) {
      console.log(stdout.trim());
    }

    if (stderr.trim()) {
      console.error(stderr.trim());
    }

    if (code !== 0) {
      hasFailures = true;
      console.log(`${fileName} - FAILED\n`);
      continue;
    }

    console.log(`${fileName} - PASSED\n`);
  }

  if (hasFailures) {
    console.log('All tests finished with failures.');
    process.exitCode = 1;
    return;
  }

  console.log('All tests finished successfully.');
}

runSequentially();
