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
    this.log(yosay(
      'Yo! This is ' + chalk.red('Egovapp') + ', egov build config scaffolder! Wow!'
    ));
    done();
  },

  writing: {
    app: function () {
      var webapp = "webapp/src/main/webapp/";
      var folder =  process.cwd().split('\\');
      this.template('_package.json', this.webapp + 'package.json', { repo: folder[folder.length-1] });
      this.copy('_bower.json', this.webapp + 'bower.json');
      this.copy('_gulpfile.js', this.webapp + 'gulpfile.js'); 
      this.copy('_.bowerrc', this.webapp + '.bowerrc'); 
      this.copy('_.npmignore', this.webapp + '.npmignore');              
    }
  }
});
