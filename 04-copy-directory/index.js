const fsPromises = require('fs/promises');
const path = require('path');

fsPromises.rm(path.join(__dirname, 'files-copy'),
  { recursive: true, force: true }).then(() => {
  fsPromises.mkdir(path.join(__dirname, 'files-copy'),
    { recursive: true }).then (() => {
    fsPromises.readdir(path.join(__dirname, 'files'),
      { withFileTypes: true }).then(files => {
      files.forEach(file => {
        fsPromises.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
      });
    });
  });
});

