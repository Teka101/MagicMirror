MagicMirror
===========

You have to install a web server with PHP support.

Changes:
 * Support HTTPS (move all external link to php)
 * Remove Yahoo API RSS to JSON (PHP do it better !)
 * Move to weather to Paris,France

Original
========
The super magic interface of my personal Magic Mirror. More information about this project can be found on the [blog](http://michaelteeuw.nl/tagged/magicmirror).

Modify js/config.js to change some general variables (language, weather location, compliments) and calendar.php to add your own ICS calendar.

For development purposes you could use another HTTP server other than Apache, e.g. [a lightweight Node.js HTTP server](https://github.com/nodeapps/http-server).
Install this using (```sudo```) ```npm install http-server -g``` and run it from the root of this repository using ```http-server```.
By default it runs on port 8080 or an increment of that if 8080 is already taken.
The HTML file ```index_dev.html``` dispenses with the need of having PHP.

