//Function which determines if the path is absolute
const path = require('path');
const fs = require('fs');

function isAbsoluteR(route) {
  try {
    const convertedRoute = path.normalize(route); // retorna texto normalizado
    return path.isAbsolute(convertedRoute); // ruta absoluta
  } catch (error) {
    console.log('Error isAbsoluteR: ', error);
  }
}

console.log(isAbsoluteR('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));

function isRelative(route) {
  try {
    return path.resolve(route); // convierte de relativa a absoluta
  } catch (error) {
    console.log('Error isRelative: ', error);
  }
}

console.log(isRelative('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));

function isValid(route) {
  try {
    const isAbsolute = isAbsoluteR(route);
    const isRel = isRelative(route);
    const resolvedRoute = isAbsolute ? route : isRel;
    fs.accessSync(resolvedRoute); // Verificar la existencia del archivo o directorio
    return true;
  } catch (error) {
    console.log('Error:', error);
    return false;
  }
}


console.log(isValid('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));

/*function isValid(route) {
  try {
    return fs.accessSync(route);
  } catch (error) {
    console.log('Error isValid:', error);
  }
}*/

/*function isValid(route) {
  try {
    const isAbsolute = isAbsoluteR(route);
    const isRel = isRelative(route);
    return isAbsolute || isRel;
  } catch (error) {
    console.log('Error isValid:', error);
    return false;
  }
}*/

// console.log(isValid('DEV006-md-links\README.md'));

function isFileOrDirectory(route) {
  try {
    const resolvedRoute = path.resolve(route);
    const stats = fs.statSync(resolvedRoute);
    // file sistem . funcion para obtener información sobre un archivo o directorio, 
    //Esta función sincrónica (bloqueante) devuelve un objeto fs.Stats que contiene detalles sobre el archivo o directorio,
    // como tamaño, fecha de modificación, permisos, etc

    if (stats.isFile()) {
      return 'Archivo';
    } else if (stats.isDirectory()) {
      return 'Directorio';
    } else {
      return 'Desconocido';
    }
  } catch (error) {
    console.log('Error:', error); // archivo o directorio roto?
    return 'Error';
  }
}

function isMarkdownFile(route) {
  try {
    const extname = path.extname(route);
    return extname === '.md';
  } catch (error) {
    console.log('Error:', error);
    return false;
  }
}

const filePath = './README.md';
const fileStatus = isFileOrDirectory(filePath);

if (fileStatus === 'Archivo') {
  if (isMarkdownFile(filePath)) {
    console.log('El archivo es un archivo .md');
  } else {
    console.log('El archivo no es un archivo .md');
    console.log([]); // Devolver un array vacío
  }
} else {
  console.log('La ruta no corresponde a un archivo');
}

console.log(isFileOrDirectory('./README.md'));

module.exports = {
  isAbsoluteR,
  isRelative,
  isValid,
  isFileOrDirectory
};






/*const path = require('path')

function isAbsolute(route) {
  try {
    const nuevaRuta = route.replace(/\\/g, /\//g);
    console.log(nuevaRuta);
    return path.isAbsolute(nuevaRuta);

  } catch (error) {
    console.log('error', error);
  }
}

console.log(isAbsolute('C:\Users\claud\Laboratoria\MD links\DEV006-md-links\prueba.md'));
console.log(isAbsolute('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/prueba.md'));


module.exports = {
  isAbsolute,
  convertirAbsolute,
}
*/
