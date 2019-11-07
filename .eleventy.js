module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'layouts',
      includes: 'includes',
      data: 'data'
    },
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
