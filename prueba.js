const { mdLinks } = require('./mdLinks.js');
const pathUser = process.argv[2];

mdLinks(pathUser, { validate: false })

  .then((links) => {
    console.log(links);
  })
  .catch(function (error) {
    console.error(error);
  });

//Ruta de prueba
//C:/Users/claud/Laboratoria/MD links/DEV006-md-links/prueba.md

function imprimir(a) {
  console.log(a);
}
