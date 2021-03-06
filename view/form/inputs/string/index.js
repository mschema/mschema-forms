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

  if (input.display === 'none') {
    $('.control-group').addClass('hidden');
  }

  $('.control-label').attr('for', input.name);
  $('.control-label').html(input.label);
  $('input').attr('id',  input.name);
  $('input').attr('name', input.name);
  if (input.value === null) {
    input.value = "";
  }
  $('input').attr('value', input.value.toString() || "");
  $('input').attr('placeholder', input.placeholder || '');
  $('input').attr('size', input.size || 20);

  if (input.disabled === true) {
    $('input').attr('disabled', 'DISABLED');
    $('input').addClass('disabled');
  }

  if (input.hint) {
    $('.hint').html(input.hint);
  }

  if(input.format === "password") {
    $('input').attr('type', "password");
  }

  if(input.format === "hidden") {
    $('input').attr('type', "hidden");
    $('.control-group').addClass('hidden');
    $('.control-label').remove()
  }

  if(input.format === "email") {
    // Bad string concat!
    $('.add-on').html('<i class="icon-envelope"></i>');
  }

  return callback(null, $.html());
};
