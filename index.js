var resource = require('resource'),
    forms = resource.define('forms');

var view = require('view');

forms.schema.description = "for generating HTML forms";

forms.method("generate", generate);

function generate (options, callback) {
  view.create({ path: __dirname + '/view', input: "html"}, function (err, view) {
    var str = '', form;
    form = view.form[options.type] || view.form['generic'];
    // determine if no schema has been passed in, but data has
    // if so, create auto-schema as best we can using text as the default values
    if (typeof options.schema === 'undefined' && typeof options.data === 'object') {
      options.schema = jsonToSchema(options.data);
    }
    form.present(options, function(err, res){
      if(err) {
        throw err;
      }
      return callback(err, res);
    });
  });
};

// converts an abritrary JSON object into an mschema based on some intelligent type checking
function jsonToSchema (data) {
  var schema = {};
  for (var p in data) {
    if (typeof data[p] === 'function') {
      // ignore function types
      continue;
    }
    // default to string types
    schema[p] = {
      type: 'string',
      default: data[p]
    }
    // ensure object types are set when detected
    if (typeof data[p] === 'object') {
      schema[p].type = 'object';
    }
  }
  return schema;
}

module['exports'] = forms;