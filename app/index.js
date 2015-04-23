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

    var prompts = [{
      name: 'appname',
      message: 'Repo name',
      default: "egov-pep-app-p00-00"
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      // this.fs.copy(
      //   this.templatePath('_package.json'),
      //   this.destinationPath('package.json')
      // );
      this.template('_package.json', 'package.json');
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );  
      this.fs.copy(
        this.templatePath('_.bowerrc'),
        this.destinationPath('.bowerrc')
      ); 
      this.fs.copy(
        this.templatePath('_.npmignore'),
        this.destinationPath('.npmignore')
      );                  
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
