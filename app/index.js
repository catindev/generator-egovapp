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
      'Yo! This is ' + chalk.red('Egovapp ') + ', frontend config scaffolder! Wow!'
    ));
    done();
  },

  writing: {
    app: function () {
      var webapp = "webapp/src/main/webapp/";
      var folder =  process.cwd().split('\\');
      this.template('_package.json', webapp + 'package.json', { repo: folder[folder.length-1] });
      this.copy('_bower.json', webapp + 'bower.json');
      this.copy('_gulpfile.js', webapp + 'gulpfile.js'); 
      this.copy('_.bowerrc', webapp + '.bowerrc'); 
      this.copy('_.npmignore', webapp + '.npmignore');              
    }
  }
});
