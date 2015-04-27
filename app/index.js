'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.folder =  process.cwd().split('\\');
    this.folder =  this.folder[this.folder.length-1];
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
    },
    makelink: function() {
      var rimraf = require('rimraf');
      var self = this;
      console.log(__dirname.replace("/"+this.folder, ""));
      rimraf('webapp/src/main/webapp/node_modules/egov-pep-frontend/build', function () {
        self.spawnCommand(
          'ln', 
            [
              '-s', 
              'webapp/src/main/webapp/node_modules/egov-pep-frontend/build ../egov-pep-frontend/src/main/resources/META-INF/resources/build'
        ]);
      });      
    }
  }
});
