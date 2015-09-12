# react-browserify-karma-gulp
This is a simple, lean boilerplate for building apps with React, Browserify and Less with Gulp as a task runner. We also have unit testing set up using Karma and PhantomJS.

It all runs a simple server.js file that sets up an Express server for development and allows for easy linting, testing and file watching/live reloads.

## Work in Progress

This project is in active development and will continue to be refined as needs arise. Note that it's < 1.x.x in its versioning. 

## Installation

You'll need Git and Node.js to do anything with this. Fairly standard stuff, but in the event you need to install these things you can grab them here:

* [Download/Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for Windows/Mac/Linux
* [Download/Install Node.js](https://nodejs.org/en/download/) for Windows/Mac/Linux

Assuming you have Git and Node.js installed, start by cloning this repo to download the required files:

    git clone https://github.com/phillipluther/react-browserify-karma-gulp.git

Navigate to the folder you just cloned and install from the included `package.json` file:

    cd react-browserify-karma-gulp
    npm install

This will run through all the development and project dependencies as outlined in `package.json` (pretty standard Node stuff). When it's done you should be good to go.

## Start the Server

To get the boilerplate up and running and check that everything went off without a hitch, do:

    gulp server

This builds our javascript and CSS files from the React .jsx and Less files, respectively; it kicks off our watch tasks and starts up the (uber-)light server. Check that all's well by visiting [http://localhost:8080](http://localhost:8080) in your browser of choice.

## Additional Tasks

The following tasks (from `gulpfile.js`) might come in handy.

### Build Development Assets (JS/CSS)

    gulp build:dev

This creates our development-friendly assets, which include sourcemaps for debugging. The files are not minified or uglified.

### Build Production Assets (JS/CSS)

    gulp build:prod

This packages our production assets. It does not include sourcemaps and all files are concatenated, minified and/or uglified.

### Test

    gulp test

This builds and runs our test suite with results output to the console.

## Troubleshooting

After cloning the repo and running `npm install` I'd get the following error on certain Linux distros:

    Fatal error: watch ENOSPC

... or some similar flavor. Odd that this occurs, as it's related to the number of files a user can watch and is (apparently) being triggered on the tiny number of items the boilerplate is watching. This solution worked for me:

    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

The fix and additional info came from [this Stack Overflow post](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc).
