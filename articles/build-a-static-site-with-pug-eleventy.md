---
layout: article-layout.pug
title: Build a static site with Pug & Eleventy
author: Marc Farias Jones
image: pug.jpg
tags: featured
summary: Get on the JamStack Static Site Hype Train!
---

### The site that you are reading this article on was created with Eleventy (11ty), using Pug (and markdown) as a templating engine and Sass as a CSS precompliler.

That sounds like a lot of stuff! let me break it down for you.

### Eleventy

Eleventy is a static site generator that takes template data in an array of formats and spits out nice, clean static html. Static sites are a super hot trend right now and for good reason. They are really fast because they don't require any server-side logic. They are also easy to build, easy to host, and very flexible.

### Pug (formerly known as Jade)

Pug is an HTML templating engine. It allows you to write your markup in a nicer, more readable way than HTML. It also allows you to inject data into your markup and iterate over arrays of data.

Eleventy supports most modern HTML templating engines, including:

-   Nunjucks
-   Liquid
-   Handlebars
-   Mustache
-   EJS
-   HAML

Choosing the right templating engine is typically a matter of taste and those with the best taste usually reach for Pug because of its clean syntax and powerful API.

### Sass

Sass is a CSS precompiler that does for CSS what Pug does for HTML. It allows you to nest selectors, reuse code, and all around make the experience of writing CSS way more enjoyable.

### "That all sounds amazing, how do I put it all together?"

The good news is that it's really simple! In just a few short steps, you can be up and running with Eleventy and building super fast static sites while enjoying the ergonomics of Pug and Sass.

# Step 1

### Start the engine!

Create an empty directory for your new site. Open a terminal in that directory and use this command to generate the file structure of your site:

<pre class="language-bash">
    <code>
        npx @11ty/eleventy --serve
    </code>
</pre>

This will make a bunch of gears start spinning as installs the required dependencies. It finishes by firing up a development server with hot reloading. How nice!

# Step 2

### Your first file

It's as easy as it sounds. Create a file in the directory called **index.pug**. Eleventy will quickly generate a folder called **\_site**, and inside it will be all of your static assets. For now that is just an HTML file name **index.html**.

Now add some Pug markup to your **index.pug** file. Something like this is fine:

<pre class="language-pug">
    <code>
        &lt;!DOCTYPE html&gt;
        html
            head
                title My Eleventy Pug Site
            body
                h1 Woah, cool!
    </code>
</pre>

After you save that file, look in the **/site/index.html** file.

it should look like this:

<script type="text/plain" class="language-markup">
    <!DOCTYPE html><html><head><title>My Eleventy Pug Site</title></head><body><h1>Woah, cool!</h1></body></html>
</script>

Yay! Eleventy is compiling your Pug into html.

# Step 3

### Templating

Pug is a templating engine so let's do some templating! We want to take the html, head, and body tags and reuse them for all of our pages.

First create a folder called **\_includes** in your root directory. This is where we will keep all of our Pug template files. Create a file in the **\_includes** folder and call it **layout.pug**.

Your file structure should now look like this:

-   **\_includes/**
    -   layout.pug
-   **\_site/**
    -   index.html
-   index.pug

Cut and paste everything **above the H1** from the **index.pug** file into the **layout.pug** file.

Now we are going to add a script to each of the files that will tell Eleventy to glue them together.

Add this to the bottom of the **layout.pug** file:

<pre class="language-pug">
    <code>
        &lt;!DOCTYPE html>
        html
            head
                title !{title}
            body !{ content }
                //- New Code
   
    </code>
</pre>

And make your **index.pug** look like this.

<pre class="language-pug">
    <code>
        ---
        layout: layout.pug
        title: Home Page
        ---

        block content
            h1 Woah, cool!
    </code>
</pre>

What we are doing is telling the **layout.pug** file where to put **content** and then telling the **index.pug** file that it is extending **layout.pug** and then putting its code into a block called **content**.

We are also passing the variable **title** which the template is using for the document title. This is how we can use the same header for each page but keep unique titles.

### That part on top of index.pug, with the dashes is called front matter. Eleventy uses front matter to hold data that it uses to compile the static pages.

Now we are compiling templates! This saves us from having to maintain the same code in different places. Yay!

# Step 4

### Get some Sass in there

Eleventy comes pretty well configured right out of the box, but we need to customize it a bit to get Sass compiling.

First lets create some new files.

Create a file in the root directory called **.eleventy.js**. Eleventy will automatically recognize it as it's configuration file.

Also in the root directory, let's create a folder called **style** and make a file in it called **index.scss**.

Lastly we need add another folder to hold some custom file-watching logic. let's call this folder **config**, make it in the root directory, and make a file in it called **sass-process.js**.

Your file structure should now look like this:

-   **\_includes/**
    -   layout.pug
-   **\_site/**
    -   index.html
-   **config/**
    -   sass-process.js
-   **style/**
    -   index.scss
-   .eleventy.js
-   index.pug

### Configuration

In order to get our Sass compiling, we need to implement some custom scripts.

Let's add this to our **sass-process.js** file:

<pre class="language-js">
    <code>
        const sass = require('sass');
        const fs = require('fs-extra');
        const path = require('path');

        module.exports = (scssPath, cssPath) => {
        // If cssPath directory doesn't exist...
        if (!fs.existsSync(path.dirname(cssPath))) {
            // Encapsulate rendered css from scssPath into result variable
            const result = sass.renderSync({ file: scssPath });
            // Create cssPath directory recursively
            fs.mkdir(path.dirname(cssPath), { recursive: true })
            // Then write result css string to cssPath file
            .then(() => fs.writeFile(cssPath, result.css.toString()))
            .catch(error => console.error(error));
        }
        // Watch for changes to scssPath directory...
        fs.watch(path.dirname(scssPath), () => {
            console.log(`Watching ${path.dirname(scssPath)}...`);
            // Encapsulate rendered css from scssPath into watchResult variable
            const watchResult = sass.renderSync({ file: scssPath });
            // Then write result css string to cssPath file
            fs.writeFile(cssPath, watchResult.css.toString()).catch(error =>
            console.error(error)
            );
        });
        };
    </code>
</pre>

and add this script to the **.eleventy.js** file:

<pre class="language-js">
    <code>
        const sass = require('/config/sass-process');

        module.exports = config => {
            //Watching for modificaions in style directory
            sass('/style/index.scss', '/_site/style/index.css');

        }
    </code>
</pre>

We are using some dependencies now so lets get them installed

<pre class="language-bash">
    <code>
        // bash
        npm init -y
        npm i sass fs-extra
    </code>
</pre>

Now restart the server and we should have Sass compiling!

**Don't forget to link the new CSS file in your layout.pug template**

<pre class="language-pug">
    <code>
       link(rel="stylesheet", href="/style/index.css")
    </code>
</pre>

### Now you're ready to start building your amazing static site! Woohoo!

# One last thing...

You are probably going to want to have images and javascript on your site. Make a folder for each of them in the root directory.

-   **\_includes/**
    -   layout.pug
-   **\_site/**
    -   index.html
-   **config/**
    -   sass-process.js
-   **images/**
    -   feelingCuteMightDeleteLater.JPG
-   **scripts/**
    -   index.js
-   **style/**
    -   index.scss
-   .eleventy.js
-   index.pug

Then we will add a couple one liners to our **.eleventy.js** file:

<pre class="language-js">
    <code>
       const sass = require('/config/sass-process');

    module.exports = config => {

        sass('/style/index.scss', '/_site/style/index.css');

        // Copy JS and Images to the _site folder
        config.addPassthroughCopy("scripts");
        config.addPassthroughCopy("images");
    
    }
    </code>
</pre>

### Bam!

Now those folders will be available to your generated pages.
