var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var discoverPartials = require('metalsmith-discover-partials');
var renameme = require('metalsmith-rename');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'My TM blog',
      description: "My TM blog."
    }
  })
  .source('./src')
  .destination('./public')
  
  .use(markdown())
  .use(collections({
    articles: {
      pattern: 'articles/**/*.html',
      sortBy: 'date',
      reverse: true
      },
    }))
  .use(
    renameme([
      [/\.md$/, ".html"]
    ])
  )
  .use(discoverPartials({
    directory: './layouts/partials',
    pattern: /\.hbs$/
  }))
  .use(permalinks({
    relative: false,
    pattern: ':title',
  }))
  .use(layouts())
  .use(serve({
    port: 8081,
    verbose: true
  }))
  .use(watch({
      paths: {
        "${source}/**/*": true,
        "layouts/**/*": "**/*",
      }
    }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('TM built!');
    }
  });