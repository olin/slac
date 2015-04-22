var sass = require('node-sass');
sass.render({
  file: '/scss/style.scss'
}, function(err, result) { /*...*/ });
// OR
var result = sass.renderSync({
  data: scss_content
  [, options..]
});

// ./node_modules/node-sass/bin/node-sass -w -r scss/ -o ./public/styles/ style.css