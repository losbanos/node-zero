const path = require('path');

const rootDir = path.dirname(process.mainModule.filename);
const publicDir = path.join(process.env.PWD, 'public');

module.exports = {
    rootDir,
    publicDir
}

