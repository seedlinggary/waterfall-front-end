module.exports = {
    render: async (req, res) => {
        const { renderToStringAsync } = require('react-dom/server');
        const { ServerStyleSheet } = require('styled-components');
        const { default: App } = require('./src/App');
    
        const sheet = new ServerStyleSheet();
        const appHtml = await renderToStringAsync(sheet.collectStyles(<App />));
        const styleTags = sheet.getStyleTags();
        const bootstrapCss = sheet.getStyleElement(); // Pre-rendered Bootstrap CSS
    
        res.send(
          `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <link rel="stylesheet" href="/path/to/your/custom.css" /> <!-- Include your custom CSS file -->
              ${bootstrapCss}
              ${styleTags}
            </head>
            <body>
              <div id="root">${appHtml}</div>
            </body>
          </html>
          `
        );
      }
    // Specify the root directory of your React app
    // If your app is in a subdirectory, update this path accordingly
    publicPath: '.',
  
    // Specify the location of your built files
    // If you use a different build output directory, update this path
    outputPath: './build',
  
    // Define custom routes to pre-render
    // If your app has dynamic routes, specify them here
    // For example, if your app has a "products" route, add '/products' to the array
    // If you don't have custom routes, leave the array empty
    routes: [
        '/',
        '/calculator',
        '/workflow',
        '/definitions',
        '/about',
        '/contact',
        '/comingsoon',
        '/mortgagecalculator',
        '/multimortgage',
        '/pandl',
        '/famtree',
        '/parentcombined',
        '/disclaimer',
        '*'
      ]
  
    // Add any additional configuration options as needed
  };
  