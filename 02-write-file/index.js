const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join('./02-write-file','destination.txt'));


stdout.write('Input text:\n');
stdin.on('data', data => {
  const text = data.toString().replace('\n', '');
  if(text === 'exit'){
    process.exit();
  }
  output.write(data);
});
process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () => stdout.write('\nOK, Bye!'));