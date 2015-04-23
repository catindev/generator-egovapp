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
  }
});
