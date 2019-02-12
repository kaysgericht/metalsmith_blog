var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'My TM blog',
      description: "My TM blog."
    }
  })
  .source('./src')
  .destination('./public')
  .use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
      },
    }))
  .use(markdown())
  .use(layouts())
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('TM built!');
    }
  });