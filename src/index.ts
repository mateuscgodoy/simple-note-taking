#!/usr/bin/env node

main();

function main() {
  try {
    init();

    console.log('Application works! 😎');
  } catch (error) {
    process.exitCode = 1;
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

function init() {
  const args = process.argv.slice(2);

  if (args.length) {
    throw new Error('Error: Note-taking does not uses any arguments');
  }
}
