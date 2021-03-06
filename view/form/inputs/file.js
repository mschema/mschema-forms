//
// string.js - input fields for String types
//
module['exports'] = function (options, callback) {

  //
  // Todo: This load statement should be moved to Viewful
  //
  var input = options.control;
  var $ = this.$.load(this.template);
  if(typeof input.error !== 'undefined') {
    $('.control-group').addClass('error');
    $('.help-inline').html(input.error.message);
  }

  $('.control-label').attr('for', input.name);
  $('.control-label').html(input.name);
  $('input').attr('id',  input.name);
  $('input').attr('name', input.name);
  $('input').attr('placeholder', input.description || '');

  return callback(null, $.html());
};
