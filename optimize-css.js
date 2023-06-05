const minimalcss = require('minimalcss');

async function optimizeCSS() {
  await minimalcss({
    urls: ['/'], // Specify the path to your generated HTML file
    outputDir: 'dist', // Replace with your build directory
    cssOutput: 'dist/css/styles.min.css', // Replace with the path to your CSS file
    minify: true, // Enable minification
  });
}

optimizeCSS();
