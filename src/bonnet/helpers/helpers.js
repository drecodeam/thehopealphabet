module.exports.register = function (Handlebars, options) {
  'use strict';

  Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {
    if (haystack && needle) {
      return haystack.replace(needle, replacement);
    } else {
      return '';
    }
  });

};