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
      var webapp = "webapp/src/main/webapp/";

      this.template('_package.json', webapp + 'package.json', { appname: folder });
      this.copy('_bower.json', webapp + 'bower.json');
      this.copy('_gulpfile.js', webapp + 'gulpfile.js'); 
      this.copy('_.bowerrc', webapp + '.bowerrc'); 
      this.copy('_.npmignore', webapp + '.npmignore');                 
    }
  },

  pomfile: function () {
    var path   = './pom.xml',
        file   = this.readFileAsString(path);

    this.write(path, "qwerty");
  },

  install: function () {
    this.installDependencies();
  }
});
