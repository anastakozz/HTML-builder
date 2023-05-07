const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(__dirname,'project-dist', 'bundle.css'));

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