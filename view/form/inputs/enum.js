//
// enum.js - input fields for String types, bound by enum constraint
//

module['exports'] = function (options, callback) {

  //
  // Todo: This load statement should be moved to Viewful
  //
  var $ = this.$.load(this.template),
      input = options.control;

  if(input.error) {
    $('.control-group').addClass('error');
    $('.help-inline').html(input.error.message);
  }

  $('.control-label').attr('for', input.name);
  $('.control-label').html(input.name);
  $('select').attr('id',  input.name);
  $('select').attr('name', input.name);
  $('select').attr('placeholder', input.description || '');
  $('select option').html('Please select ' + input.name + '...');

  var _options = input.enum;
  _options.forEach(function(option, i){
    var checked = "";
    if(option === input.value) {
      checked = 'checked';
    }
    //var controls = $('.controls').clone();
    $('.control-group').append('<div class="controls">' + option  + ': <input type="radio" ' + checked + ' name="' + input.name + '" value="' + option + '"></div>'); // Bad string concat!
  });

  return callback(null, $.html());
};
