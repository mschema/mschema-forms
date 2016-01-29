var resource = require('resource'),
    forms = resource.define('forms');

var view = require('view');

forms.schema.description = "for generating HTML forms";

forms.method("generate", generate);

function generate (options, callback) {
  view.create({ path: __dirname + '/view', input: "html"}, function (err, view) {
    var str = '', form;
    form = view.form[options.type] || view.form['generic'];
    form.present(options, function(err, res){
      if(err) {
        throw err;
      }
      return callback(err, res);
    });
  });
};

module['exports'] = forms;