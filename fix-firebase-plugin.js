/*
 * This script is run from hooks like before_build and before_emulate inside config.xml. It is designed to fix
 * a problem caused by having multiple plugins that use different versions of google services. Plugins like
 * cordova-plugin-googleplus, cordova-plugin-google-analytics, and cordova-plugin-firebase can cause this
 * issue, which manifests itself as the "multiple dex files" error or others.
 * This script copies over a file called build-extras.gradle that tells android which versions of the google services
 * to use for all the plugins.
 */
const fs = require('fs');
const path = require('path');

module.exports = function(context) {
    const rootdir = context.opts.projectRoot;
    const platformDir = 'platforms/android';
    //change the path to your external gradle file
    const srcFile = path.join(rootdir, 'build-extras.gradle');
    const destFile = path.join(rootdir, platformDir, 'build-extras.gradle');

    console.log('copying ' + srcFile + ' to ' + destFile);
    fs.createReadStream(srcFile).pipe(fs.createWriteStream(destFile));
};
