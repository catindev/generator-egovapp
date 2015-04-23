'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Yo! This is ' + chalk.red('Egovapp') + ', easy service scaffolder! Wow!'
    ));

    this.webapp =  "webapp/src/main/webapp/";

/*    var prompts = [{
      name: 'appname',
      message: 'Repo name',
      default: "p00-00"
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));*/
    done();
  },

  writing: {
    app: function () {
      var folder =  process.cwd().split('\\'); 
      folder = folder[folder.length-1].replace("egov-pep-app-","");

      this.template('_package.json', this.webapp + 'package.json', { appname: folder });
      this.copy('_bower.json', this.webapp + 'bower.json');
      this.copy('_gulpfile.js', this.webapp + 'gulpfile.js'); 
      this.copy('_.bowerrc', this.webapp + '.bowerrc'); 
      this.copy('_.npmignore', this.webapp + '.npmignore');                 
    }
  },

  pomfile: function () {
  var fs = require('fs'),
    xml2js = require('xml2js');
    var parser = new xml2js.Parser();


    var path   = './pom.xml',
        file   = this.readFileAsString(path);
    console.log(parser.parseString(file));

    //this.write(this.webapp + "pom.xml", "qwerty");
  },

  install: function () {
    //this.installDependencies();
    console.log("new app scaffolded!");
  }
});
