const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch").default;
pathUser = process.argv[2]; // Obtener la ruta del usuario desde los argumentos de la línea de comandos

// Función que verifica si una ruta de archivo o directorio existe
const pathExists = (pathUser) => {
  // Verificar si la ruta especificada por pathUser existe en el sistema de archivos
  if (fs.existsSync(pathUser)) {
    return true; // Si la ruta existe, retornar true
  } else {
    return false; // Si la ruta no existe, retornar false
  }
};

// Función que verifica si la ruta es absoluta y, si es relativa, la convierte en absoluta
const convertToAbsolutePath = (pathUser) => {
  // Verificar si la ruta especificada por pathUser es absoluta
  if (path.isAbsolute(pathUser)) {
    return pathUser; // Si la ruta es absoluta, retornarla sin cambios
  } else {
    // Si la ruta es relativa, convertirla a una ruta absoluta utilizando el directorio de trabajo actual (current working directory, cwd)
    return path.resolve(process.cwd(), pathUser);
  }
};

// Leer el directorio y retornar un array de archivos .md
const readDir = (pathUser) => {
  const mdFiles = []; // Array para almacenar los archivos .md encontrados

  const stats = fs.statSync(pathUser); // Obtener información sobre la ruta especificada

  if (stats.isFile() && path.extname(file) === ".md") {
    // Si la ruta es un archivo y tiene extensión .md, se agrega al array mdFiles
    return [pathUser];
  }

  const files = fs.readdirSync(pathUser); // Obtener una lista de archivos y directorios en la ruta especificada

  files.forEach((file) => {
    const absoluteFilePath = path.join(pathUser, file); // Obtener la ruta absoluta del archivo o directorio

    const stats = fs.statSync(absoluteFilePath); // Obtener información sobre el archivo o directorio en la ruta

    if (stats.isDirectory()) {
      // Si la ruta es un directorio, se realiza una llamada recursiva a readDir para buscar archivos .md dentro de él
      mdFiles.push(...readDir(absoluteFilePath));
    } else {
      if (path.extname(file) === ".md") {
        // Si la ruta es un archivo con extensión .md, se agrega al array mdFiles
        mdFiles.push(absoluteFilePath);
      }
    }
  });

  return mdFiles; // Devolver el array de archivos .md encontrados
};

// Función que lee archivos .md
const readFileMd = (pathUser) => {
  return new Promise((resolve, reject) => {
    let links = []; // Array para almacenar los enlaces encontrados

    fs.readFile(pathUser, "utf8", (err, data) => {
      if (err) {
        reject(err, "No se puede leer el archivo"); // Si hay un error al leer el archivo, se rechaza la promesa con el error
      } else {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g; // Expresión regular para buscar enlaces en el contenido del archivo
        let match;

        while ((match = regex.exec(data))) {
          const text = match[1]; // Texto del enlace
          const url = match[2]; // URL del enlace

          links.push({ href: url, text, file: pathUser }); // Agregar el enlace al array de enlaces
        }

        resolve(links); // Resolver la promesa con el array de enlaces encontrados
      }
    });
  });
};

// Función que valida la URL
const validateUrl = (links) => {
  return new Promise((resolve, reject) => {
    fetch(links.href)
      .then((response) => {
        const status = response.status; // Estado de la respuesta HTTP

        // Determinar el estado del enlace según el código de estado de la respuesta
        const statusText = status >= 200 && status < 399 ? "OK" : "Fail";

        resolve({ status, statusText }); // Resolver la promesa con el estado del enlace
      })
      .catch((error) => {
        const status = 404; // Not Found (No encontrado)
        const statusText = "Fail";

        reject({ status, statusText, error }); // Rechazar la promesa con el estado del enlace y el error
      });
  });
};

// Función que valida el estado de múltiples URLs
const validateURLs = (urls, filePath) => {
  const urlPromises = urls.map((urlInfo) => {
    return validateUrl(urlInfo)
      .then(({ status }) => {
        // Si la validación es exitosa, se crea un objeto con la información del enlace y su estado
        return {
          href: urlInfo.href,
          text: urlInfo.text,
          file: filePath,
          status: status,
          statusText: status >= 200 && status < 399 ? "OK" : "Fail",
        };
      })
      .catch((error) => {
        // Si la validación falla, se crea un objeto con la información del enlace, su estado y el error
        return {
          href: urlInfo.href,
          text: urlInfo.text,
          file: filePath,
          status: error.status,
          statusText: error.statusText,
        };
      });
  });

  return Promise.all(urlPromises); // Devolver una promesa que se resuelve cuando todas las validaciones de URLs han finalizado
};

module.exports = {
  pathExists,
  convertToAbsolutePath,
  readDir,
  readFileMd,
  validateUrl,
  validateURLs,
};







//Function which determines if the path is absolute
/*const path = require('path');
const fs = require('fs');

const prueba = "C:/Users/claud/Laboratoria/MD links/DEV006-md-links/prueba.md"

const hasToBeAbsolute = (route) => {
  if (path.isAbsolute(route)) {  // The path.isAbsolute() method determines if path is an absolute path.
    return true;
  } else {
    path.resolve(route);
    return true; // convierte de relativa a absoluta The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
  }
};

console.log(hasToBeAbsolute(prueba));


const hasToExist = (route) => {
  if (fs.existsSync(route)) {
    return true;
  } else {
    return "La ruta no existe";
  }

};

console.log(hasToExist(prueba));

const hasToBeFile = (route) => {
  const stats = fs.statSync(route);
  if (stats.isFile()) {
    return 'Archivo';
  } else if (stats.isDirectory()) {
    return 'Directorio';
  }

};

console.log(hasToBeFile(prueba));

const hasToBeMd = (route) => {
  const extname = path.extname(route);
  if (extname === ".md") {
    return true;
  } else {
    return false;
  }
};

console.log(hasToBeMd(prueba));


const hasToBeReadFile = (route) => {
  return new Promise((resolve, reject) => {
    let links = []; // Array para almacenar los enlaces encontrados
    fs.readFile(route, "utf8", (err, data) => {
      if (err) {
        reject(err, "No se puede leer el archivo"); // Si hay un error al leer el archivo, se rechaza la promesa con el error
      } else {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g; // Expresión regular para buscar enlaces en el contenido del archivo
        let match;
        while ((match = regex.exec(data))) {
          const text = match[1]; // Texto del enlace
          const url = match[2]; // URL del enlace
          links.push({ href: url, text, file: route }); // Agregar el enlace al array de enlaces
        }
        resolve(links); // Resolver la promesa con el array de enlaces encontrados
      }
    });
  });
}

console.log(
  hasToBeReadFile(prueba)
    .then((links) => {
      console.log(links); // Aquí puedes hacer lo que necesites con los enlaces encontrados
    })
    .catch((error) => {
      console.error('Error:', error); // Manejar cualquier error que ocurra durante la lectura del archivo
    })
);


// Función que valida la URL
const hasToBeUrl = (route) => {
  return new Promise((resolve, reject) => {
    fetch(route.href)
      .then((response) => {
        const status = response.status; // Estado de la respuesta HTTP
        // Determinar el estado del enlace según el código de estado de la respuesta
        const statusText = status >= 200 && status < 399 ? "OK" : "Fail";
        resolve({ status, statusText }); // Resolver la promesa con el estado del enlace
      })
      .catch((error) => {
        const status = 404; // Not Found (No encontrado)
        const statusText = "Fail";
        reject({ status, statusText, error }); // Rechazar la promesa con el estado del enlace y el error
      });
  });
};

console.log(
  hasToBeUrl(prueba)
    .then(() => {
      console.log(resolve); //
    })
    .catch((error) => {
      console.error('Error:', error); // Manejar cualquier error que ocurra durante
    })
);

/*

// Función que valida el estado de múltiples URLs
const hasToBeValidUrl = (urls, filePath) => {
  const urlPromises = urls.map((urlInfo) => {
    return validateUrl(urlInfo)
      .then(({ status }) => {
        // Si la validación es exitosa, se crea un objeto con la información del enlace y su estado
        return {
          href: urlInfo.href,
          text: urlInfo.text,
          file: filePath,
          status: status,
          statusText: status >= 200 && status < 399 ? "OK" : "Fail",
        };
      })
      .catch((error) => {
        // Si la validación falla, se crea un objeto con la información del enlace, su estado y el error
        return {
          href: urlInfo.href,
          text: urlInfo.text,
          file: filePath,
          status: error.status,
          statusText: error.statusText,
        };
      });
  });
};

*/

/*

module.exports = {
  hasToBeAbsolute,
  hasToExist,
  hasToBeFile,
  hasToBeMd,
  hasToBeReadFile,
  hasToBeUrl,
  //hasToBeValidUrl,

};


/*function isValid(a) {
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
}*/

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

//al final no se pudo con access sync porque no devuelve valores boleanos :(

//console.log(isValid('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));

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



/*function isFileOrDirectory(route) {
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

/*function isMarkdownFile(route) {
  const extname = path.extname(route);
  if (extname === ".md") {
    return true;
  } else {
    return false;
  }

}

console.log(isMarkdownFile("C://Users//USER//Desktop//Proyecto4//DEV006-md-links//mock-directory//mockREADME.md"));
*/




















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

/*const hasToBeReadFile = (route) => {
  const links = fs.readFileSync(route, 'utf-8');
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

  if (links === regex) {
    return links;
  } else {
    return "no hay links"
  }

}

console.log(hasToBeReadFile('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));*/
