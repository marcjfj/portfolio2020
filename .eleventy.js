const sass = require('./config/sass-process');

module.exports = config => {


    //Watching for modificaions in style directory
    sass('./style/index.scss', './_site/style/index.css');

    // Copy JS and Images to the _site folder
    config.addPassthroughCopy("js");
    config.addPassthroughCopy("images");
   
}

module.exports = {
    pathPrefix: "/portfolio2020-build/"
};