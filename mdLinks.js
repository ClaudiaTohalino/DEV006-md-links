const { isAbsoluteR, isRelative, isValid, isFileOrDirectory, isMarkdownFile } = require('./index.js');

function mdLinks(route) {
  return {
    isAbsoluteR: isAbsoluteR(route),
    isRelative: isRelative(route),
    isValid: isValid(route),
    isFileOrDirectory: isFileOrDirectory(route),
    isMarkdownFile: isMarkdownFile(route)
  };
}

console.log(mdLinks('C:/Users/claud/Laboratoria/MD links/DEV006-md-links/README.md'));