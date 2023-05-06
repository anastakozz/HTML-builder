// const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

fsPromise.readdir(path.join(__dirname, './secret-folder'),
  { withFileTypes: true }).then(files => {
  files.forEach( file => {
    if(file.isFile()){
      let ext = path.extname(file.name);
      let name = path.basename(file.name, ext);
      fsPromise.stat(path.join(__dirname, 'secret-folder', file.name)).then(data => {
        console.log(name + ' - ' + ext.replace('.', '') + ' - ' + data.size + 'B');
      });
    }
  });
}
);