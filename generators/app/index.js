'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the epic ' + chalk.red('Kubernetes') + ' generator!'
    ));

    var prompts = [{
        type: 'list',
        choices: ['both', 'service', 'replication'],
        name: 'ktype',
        message: 'Which type do you want to generate?'
        // default: both
      },
      {
        type: 'input',
        name: 'kname',
        message: 'Please give me the name of the service/replicationcontroller'
        // default: 'true'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      if (this.props.ktype === 'both' || this.props.ktype === 'service') {
        this.fs.copyTpl(
          this.templatePath('_svc.yml'),
          this.destinationPath('svc.yml'),
          {'name': this.props.kname}
        );
      }
      if (this.props.ktype === 'both' || this.props.ktype === 'replication') {
        this.fs.copyTpl(
          this.templatePath('_rc.yml'),
          this.destinationPath('rc.yml'),
          {'name': this.props.kname}
        );
      }
    }
  }
});
