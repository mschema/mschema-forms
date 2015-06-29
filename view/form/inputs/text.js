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
  $('.control-label').html(input.label);
  //  $('input').attr('id',  input.name);
  $('textarea').html(input.value);
  $('textarea').attr('name', input.name);
  $('textarea').attr('placeholder', input.description || '');
  if(input.format === "hidden") {
    $('input').attr('type', "hidden");
    $('.control-label').remove()
  }

  if(input.format === "email") {
    // Bad string concat!
    $('.add-on').html('<i class="icon-envelope"></i>');
  }

  return callback(null, $.html());
};
