var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');

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
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('TM built!');
    }
  });