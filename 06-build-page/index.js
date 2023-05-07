const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');


function createDir() {
  fsPromises.mkdir(path.join(__dirname, 'project-dist'),
    { recursive: true }).then(() => {
    fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true });
  });
}
createDir();

function copyAssets() {
  fsPromises.readdir(path.join(__dirname, 'assets'),
    { withFileTypes: true }).then(dirs => {
    dirs.forEach(dir => {
      fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets', dir.name),
        { recursive: true }).then(() => {
        fsPromises.readdir(path.join(__dirname, 'assets', dir.name),
          { withFileTypes: true }).then(files => {
          files.forEach(file => {
            fsPromises.copyFile(path.join(__dirname, 'assets', dir.name ,file.name), path.join(__dirname, 'project-dist', 'assets', dir.name,file.name));
          });
        });
      });
    //   fsPromises.copyFile(path.join(__dirname, 'assets', file.name), path.join(__dirname, 'project-dist', 'assets', file.name));
    });
  });
}
copyAssets();

function mergeStyles() {
  let output = fs.createWriteStream(path.join(__dirname,'project-dist', 'style.css'));
  fsPromises.readdir(path.join(__dirname, 'styles'),
    { withFileTypes: true }).then( files => {
    files.forEach( file => {
      let ext = path.extname(file.name);
      if(file.isFile() && ext === '.css'){
        fsPromises.readFile(path.join(__dirname, 'styles', file.name), 
          { encoding: 'utf8' }).then( data => {
          output.write(data);
        });
      }
    }
    );
  });
}
mergeStyles();