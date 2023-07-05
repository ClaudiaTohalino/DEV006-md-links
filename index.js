//Function which determines if the path is absolute
const path = require('path');
const fs = require('fs');

function isAbsR(a) {
  try {
    return path.isAbsolute(a); // The path.isAbsolute() method determines if path is an absolute path.
  } catch (error) {
    console.log('Error isAbsR: ', error);
  }
}
// console.log(isAbsoluteR('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));

function isRelative(rutax) {
  try {
    return path.resolve(rutax); // convierte de relativa a absoluta The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
  } catch (error) {
    console.log('Error isRelative: ', error);
  }
}
// console.log(isRelative('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));

function isValid(a) {
  try {
    const isAbsolute = isAbsR(a);
    const isRel = isRelative(a);
    const resolvedRoute = isAbsolute ? a : isRel;
    fs.accessSync(resolvedRoute, fs.constants.F_OK); // 1
    return true;
  } catch (error) {
    console.log('Error:', error);
    return false;
  }
}

// 1   
// La función fs.accessSync() es una función sincrónica en Node.js que se utiliza para 
//verificar la accesibilidad de un archivo o directorio en el sistema de archivos. 
//Permite comprobar si puedes leer, escribir o ejecutar un archivo o directorio en una ubicación específica.
// fs.accessSync(path[, mode])
//path es la ruta al archivo o directorio que se desea comprobar.
//mode es un argumento opcional que especifica la operación que se desea verificar. Puede ser una combinación 
//de las siguientes constantes definidas en el módulo fs:
//fs.constants.F_OK: Comprueba si el archivo o directorio existe.
//fs.constants.R_OK: Comprueba si el archivo o directorio es legible.
//fs.constants.W_OK: Comprueba si el archivo o directorio es escribible.
//fs.constants.X_OK: Comprueba si el archivo o directorio es ejecutable.
//Si no se especifica el argumento mode, se asume fs.constants.F_OK por defecto, lo que significa que solo 
//se verifica la existencia del archivo o directorio.
//La función fs.accessSync() no lanza excepciones si el archivo o directorio no es accesible según los 
//criterios especificados. En su lugar, lanzará un error si ocurre un problema durante la verificación, 
//como un error de permisos o una ruta no válida.

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
    }
  } catch (error) {
    console.log('Error:', error); // archivo o directorio roto?
    return 'Error';
  }
}



console.log(isFileOrDirectory('./README.md'));


/*function isMarkdownFile(route) {
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

/*

// Función que verifica si el archivo es un archivo Markdown y extrae los enlaces
function isMarkdownFile(route) {
  return new Promise((resolve, reject) => {
    const extname = path.extname(route); // Obtiene la extensión del archivo en la ruta especificada

    if (extname === ".md") {
      // Comprueba si la extensión es ".md" (archivo Markdown)
      fs.readFile(route, "utf8", (error, content) => {
        if (error) {
          console.log("Error:", error);
          reject(error); // Rechaza la promesa si ocurre un error al leer el archivo
        } else {
          const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g; // Expresión regular para encontrar los enlaces en el contenido
          const links = [];
          let match;
          while ((match = linkRegex.exec(content))) {
            // Busca coincidencias de enlaces en el contenido usando la expresión regular
            const [, text, url] = match; // Extrae el texto y la URL del enlace
            links.push({ text, url }); // Agrega el enlace al array de enlaces
          }

          resolve({
            isMarkdown: true,
            links,
          }); // Resuelve la promesa con el objeto de resultado
        }
      });
    } else {
      resolve({
        isMarkdown: false,
        fileType: extname,
      }); // Resuelve la promesa con el objeto indicando que no es un archivo Markdown y el tipo de archivo
    }
  });
}
//Prueba de isMarkdownFile
console.log(
  isMarkdownFile(
    "C://Users//USER//Desktop//Proyecto4//DEV006-md-links//mock-directory//mockREADME.md"
  )
); 
*/

function isMarkdownFile(route) {
  const extname = path.extname(route);
  if (extname === ".md") {
    return true;
  } else {
    return false;
  }

}

console.log(isMarkdownFile("C://Users//USER//Desktop//Proyecto4//DEV006-md-links//mock-directory//mockREADME.md"));



module.exports = {
  isAbsR,
  isRelative,
  isValid,
  isFileOrDirectory,
  isMarkdownFile,
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
