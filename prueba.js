const { mdLinks } = require('./mdLinks.js');
const pathUser = process.argv[2];

mdLinks(pathUser, { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

  //Ruta de prueba
  //C:/Users/claud/Laboratoria/MD links/DEV006-md-links/prueba.md
