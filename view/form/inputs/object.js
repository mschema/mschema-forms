//
// object.js - recursive input field for object types
//

module['exports'] = function (options, callback) {
  var self = this;
  var input = options.control;
  var $ = this.$.load(this.template);
  if(typeof input.error !== 'undefined') {
    $('.control-group').addClass('error');
    $('.help-inline').html(input.error.message);
  }
  /*
  Remark: Currently no labels for the field, only it's properties
  var label = $('.control-label');
  label.attr('for', input.name);
  label.html(input.label || input.name);
  */

  /* 
    Remark: we could add a simple textarea dump for objects as an alternate option to nested inputs
    if (input.format === "textarea") {
      var textarea = $('textarea');
      textarea.attr('name', input.name);
      textarea.attr('id', input.name);
      //console.log(input)
      textarea.html(JSON.stringify(input.value, true, 2));
      return callback(null, $.html());
    }
    $('textarea').remove();
  */
  var count = Object.keys(input.value).length;
  var keys = Object.keys(input.value).length;

  if (keys === 0) {
    $('.help-inline').html('No data available.')
    return callback(null, $.html());
  }

  Object.keys(input.value).forEach(function(prop, i){
    var _control = {
      name: prop,
      type: "string", // TODO: multitple types, detect by value or schema
      label: input.name + "." + prop,
      value: input.value[prop]
    };
    self.parent.index.present({ control: _control }, function (err, _input){
      console.log(err, _input)
      $('.inputs-object').append(_input);
      count--;
      if (count === 0) {
        return callback(null, $.html());
      }
    })
  });

};
