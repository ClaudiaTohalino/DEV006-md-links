const mdLinks = require('../');

const pathUser = "";

describe("mdLinks", () => {
  it("Deberia retornar una promesa que se resuelve con un array de objetos", (done) => {
    const result = mdLinks(pathUser, options);
    expect(result)
      .resolves.toEqual([
        {

        }
      ]).then(done);
  });
});
