const { Transform } = require('stream');
const fs = require('fs');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
}); 

const readStream = fs.createReadStream('tarea1.txt');
const writeStream = fs.createWriteStream('texto_mayúsculas.txt');

readStream.pipe(transformStream).pipe(writeStream);



