const { mdLinks } = require('../mdLinks.js');



describe("mdLinks", () => {

  it("Deberia retornar una promesa que se resuelve con un array de objetos", (done) => {
    const pathUser = "prueba.md";
    const options = { validate: true }

    const result = mdLinks(pathUser, options);
    expect(result)
      .resolves.toEqual([
        {
          href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
          text: 'Función Callback - MDN',
          file: 'C:\\Users\\claud\\Laboratoria\\MD links\\DEV006-md-links\\prueba.md',
          status: 200,
          statusText: 'OK'
        }
      ]).then(done);
  });

  it("Deberia retornar una promesa que se resuelve con un array de objetos", (done) => {
    const pathUser = "prueba.md";
    const options = { validate: false }

    const result = mdLinks(pathUser, options);
    expect(result)
      .resolves.toEqual([
        {
          href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
          text: 'Función Callback - MDN',
          file: 'C:\\Users\\claud\\Laboratoria\\MD links\\DEV006-md-links\\prueba.md',
        }
      ]).then(done);
  });


});


