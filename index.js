//EJEMPLO 1 (Se usa el fs para poder leer el documento de texto, el cual se vera representado como el flujo de datos de stream, esto hará que se presenten en forma de fragmentos y al finalizar dará como mensaje el ‘end’ de lectura completa. Si se cambia el nombre del archivo dará como resultado error.)

//const fs = require('fs');
//const readable = fs.createReadStream("oño.txt", { encoding: 'utf8' });
// readable.on('data', chunk => console.log('Fragmento recibido: ', chunk));
// readable.on('end', () => console.log('Lectura Completa.'));
// readable.on('error', err => console.error('Error: ', err));

//EJEMPLO 2 (Crea un archivo llamado salida.txt en el cual se reflejan 2 mensajes, los cuales son: 
//-Este es un mensaje de prueba
//-Fin de mensaje)

//const fs = require('fs');
// const wriable = fs.createWriteStream('salida.txt');
// wriable.write('Hola, este es un archivo de prueba.\n');
// wriable.end('Final del mensaje.');
// wriable.on('finish', () => console.log('Escritura Completada.'));

//EJEMPLO 3 (Usando streams para procesar datos, lo que hace el código es leer y comprimir el archivo txt y guarda un resultado volviéndolo una entrada.txt.gz.)

// const fs = require('fs');
// const zlib = require('zlib');
// const readStream = fs.createReadStream('entrada.txt');
// const writeStream = fs.createWriteStream('entrada.txt.gz');
// const gzal = zlib.createGzip();
// readStream.pipe(gzal).pipe(writeStream);

//EJEMPLO 4 

const fs = require('fs');
const readable = fs.createReadStream("oño.txt", { encoding: 'utf8' });
const writable = fs.createWriteStream('salida.txt');
readable.on('data', chunk => {
    if (!writable.write(chunk)) {
        readable.pause();
    }
});
writable.on('drain', () => readable.resume());