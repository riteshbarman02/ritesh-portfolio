/* eslint-env node */

const fs = require('fs');
const path = require('path');

const projectDir = path.join(__dirname, '../public/content/project');
const indexFile = path.join(projectDir, 'index.json');

function generateIndex() {
  fs.readdir(projectDir, (err, files) => {
    if (err) {
      console.error('Failed to read project directory:', err);
      return;
    }

    const markdownFiles = files.filter(file => file.endsWith('.md'));

    fs.writeFile(indexFile, JSON.stringify(markdownFiles, null, 2), (err) => {
      if (err) {
        console.error('Failed to write index.json:', err);
      } else {
        console.log('index.json generated successfully with files:', markdownFiles);
      }
    });
  });
}

generateIndex();
