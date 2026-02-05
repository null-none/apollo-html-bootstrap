# Apollo - Bootstrap 5 HTML Responsive Admin Template

## Overview
Apollo is a clean and minimal responsive Bootstrap 5 admin template.

<strong><a href="https://apollo-html-bootstrap.netlify.com/)">View Demo</a>

## Table of contents

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Template Pages](#template-pages)
- [Demo Link](#demo-link)
- [Template Key Features](#template-key-features)
- [Template File Structure](#template-file-structure)
- [Handlebars](#handlebars)
- [Template JSON Data](#template-json-data)
- [Customise Template Styles](#customise-template-styles)
- [Create New Pages](#create-new-pages)
- [Bootstrap Documentation](#bootstrap-documentation)
- [Credits](#credits)
- [Contact Us](#contact-us)


## Requirements
If you do not intend to work with the template source code (and that means you will not be compiling it or running the Webpack dev server), you do not need to install anything. You can simply navigate to the dist folder and start editing the files.

Most developers will be editing the source code and will also be running Webpack to recompile the template files. If that's the case, then ensure that you have Node.js installed. [You can download it from here](https://nodejs.org/en/download/)


## Quick Start
- Install Node.js if you don't already have it on your system.
- Open the project root in your command line.
- run `npm install` in your command line.
- run `npm start` to start Webpack devserver.
- if you want to recompile the template files (which output to the dist folder), run `npm run build`


## Template Pages
The template consists of the following pages:

* Dashboard
* User Management Page
* Chart Example Page
* Login Page
* Register Page
* Forgot Password Page
* 404 Page
* Blank Page

As well as the following widgets:

* User Settings Dropdown
* User Activity Dropdown
* User Messages Dropdown
* User Notifications Dropdown
* Various Chart.js Widgets
* Visitors By Country
* Visitors By OS System

To keep code repetition to a minimum, we've used Handlebars.js as the templating engine and partials to quickly add the same code to different pages. We also use a Handlebars plugin for JSON data - this allows us to use loops and output a single HTML code block instead of repeating the same HTML.
