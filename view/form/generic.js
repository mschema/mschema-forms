var mschema = require('mschema');

module['exports'] = function (options, callback) {

 options = options || {};
 var schema = options.schema;
 
 var $ = this.$,
     self = this,
     output = '',
     entity = options.resource || 'unknown';

  showForm();

  function showForm (data, errors) {

    $('h1').html(entity + ' - create');
    $('.back').html('back to ' + entity);
    $('.back').attr('href', '/' + entity);
    $('form').attr('action', options.form.action || "");
    $('form').attr('name', options.form.name || "mschema-forms-generic");
    $('form').addClass(options.form.name || "mschema-forms-generic");
    //$('form').attr('id', options.form.id || "mschema-forms-generic");
    
    $('legend').html(options.form.legend);
    $('button[type="submit"]').html(options.form.submit || 'Submit');

    cont = function(err, result) {
      if (result) {
        output += result;
      }
      if(arr.length === 0) {
        $('.inputs').html(output);
        return callback(null, $.html())
      }

      var property = arr.pop();
      
      //console.log('got property', property, schema[property])
      var _mschema = {};
      _mschema[property] = schema[property];
      
      //console.log('mschmea', _mschema)
      var validator = mschema.define(_mschema);

      var validate = validator.validate({});
      //console.log('validate', validate.instance);

      // TODO: Consider iterating through all schema properties and mapping them to input
      // ( this will allow for abritrary tag attributes )
      var input = {};

      input.name = property;
      input.type = schema[property].type;
      input.format = schema[property].format;
      input.description = schema[property].description || "";
      input.defaultState = schema[property].defaultState || "";
      input.placeholder = schema[property].placeholder || "";
      input.size = schema[property].size || 20;
      input.display = schema[property].display || "";

      for (p in schema[property]) {
        input[p] = schema[property][p];
      }

      if (typeof schema[property].disabled !== "undefined") {
        input.disabled = schema[property].disabled;
      }

      input.value = validate.instance[property] || "";
      input.label = schema[property].label || input.name;

      if(schema[property].enum) {
        input.enum = schema[property].enum;
      }

      if (input.type === "file") {
        // if any form fields are detected, set enctype to multipart
        $('.form').attr('enctype', 'multipart/form-data');
      }
      options.control = input;
      self.parent.inputs.index.present(options, cont);
    };

    var arr = Object.keys(schema);
    arr.reverse();
    cont();
  }

}
