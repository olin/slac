#Stay Late and Create

### How to Style

1. Make sure that you are running `npm run build` for keeping the server alive. This way you have the sass compiler on, and when you make changes in the `scss` folder, the browser will automatically reflect these changes.
1. Add you styling in the most appropriate folder/file so that our styling chunks are also modularized. For reference to how to use these folders, check out: http://www.sitepoint.com/architecture-sass-project/
1. If you are creating a new file, follow the naming convention of `_fileName.scss` with the `_`. This is just for our standard, and it indicates that the file is a private one. 
1. Make sure to `@import` your in new file `style.scss`. Don't worry if you are just working on existing files.
1. That's it! The client should now have plain CSS, and you can now be more Sassy!