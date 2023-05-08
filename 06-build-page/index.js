const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');


function createDir() {
  fsPromises.mkdir(path.join(__dirname, 'project-dist'),
    { recursive: true }).then(() => {
    fsPromises.rm(path.join(__dirname, 'files-copy'),
      { recursive: true, force: true }).then (() => {
      fsPromises.mkdir(path.join(__dirname, 'project-dist', 'assets'),
        { recursive: true });
    });
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


let code = '';
function bundleHtml() {
//   const output = fs.createWriteStream(path.join(__dirname,'project-dist', 'index.html'));
  let part = '';
  fsPromises.readFile(path.join(__dirname, 'template.html'),
    { encoding: 'utf8' }).then ((data) => {
    code = data.toString();
    console.log(code.length);
    // console.log(code);
    fsPromises.readdir(path.join(__dirname, 'components'),
      { withFileTypes: true }).then (files => {
      files.forEach(file => {
        fsPromises.readFile(path.join(__dirname, 'components', file.name),
          { encoding: 'utf8' }).then ((content) => {
          let ext = path.extname(file.name);
          let name = path.basename(file.name, ext);
          part = content.toString();
          code = code.replace(`{{${name}}}`, part);
          // console.log(code.length);
          fsPromises.writeFile(path.join(__dirname,'project-dist', 'index.html'), code).then(() => {
            return code;
          });
        });
      });
    });
  });
}
bundleHtml();
