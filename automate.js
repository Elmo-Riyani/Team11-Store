/**
 * Team Project - automate.js
 * Team Members:
 * Adam Jama
 * Ricardo Sylvestre
 * Elmotasembella Riyani
 */

const { exec } = require('child_process');

console.log('Running Team 11 Store tests...\n');

exec('npm test', (error, stdout, stderr) => {
  if (stdout) {
    console.log(stdout);
  }

  if (stderr) {
    console.error(stderr);
  }

  if (error) {
    console.error(`Test run failed: ${error.message}`);
    return;
  }

  console.log('\nAll tests finished.');
});