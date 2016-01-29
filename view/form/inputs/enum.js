//
// enum.js - input fields for String types, bound by enum constraint
//

module['exports'] = function (options, callback) {

  //
  // Todo: This load statement should be moved to Viewful
  //
  var $ = this.$.load(this.template),
      input = options.control;

  if (input.error) {
    $('.control-group').addClass('error');
    $('.help-inline').html(input.error.message);
  }

  if (input.display === "none") {
    $('.control-group').addClass('hidden');
  }

  $('.control-label').attr('for', input.name);
  $('.control-label').html(input.label);
  $('select').attr('id',  input.name);
  $('select').attr('name', input.name);
  $('select').attr('placeholder', input.description || '');
  $('select option').html('Please select ' + input.name + '...');

  var _options = input.enum;

  if (input.format === "select") {
    // render <select> input
    var str = '<div class="controls"><select class="' + input.name + '" name="' + input.name + '">';
    _options.forEach(function(option, i){
      var selected = "";
      if(option === input.value) {
        selected = 'SELECTED="SELECTED"';
      }
      str += '<option value = "' + option + '" ' + selected + '>' + option + '</option>'; // Bad string concat!
    });
    str += '</select></div>'
    $('.control-group').append(str);
  } else if (input.format === "checkbox") {
    // render checkboxes
    _options.forEach(function (option, i){
      var checked = "";
      if (option === input.value) {
        checked = 'checked';
      }
      if (input.defaultState === "checked") {
        checked = 'checked';
      }
      var domID = input.name + "_" + option;
      $('.control-group').append('<div class="controls"><label for="' + domID + '">' + option  + '</label><input id="' + domID +  '"type="checkbox" ' + checked + ' name="' + input.name + '" value="' + option + '"></div>'); // Bad string concat!
    });
  } else {
    // render radio buttons
    _options.forEach(function (option, i){
      var checked = "";
      if (option === input.value) {
        checked = 'checked';
      }
      $('.control-group').append('<div class="controls">' + option  + ': <input type="radio" ' + checked + ' name="' + input.name + '" id="' + input.name + "' " + 'value="' + option + '"></div>'); // Bad string concat!
    });
  }

  if (input.selectAll === true) {
    $('.control-label[for="' + input.name + '"]').after('<div class="controls"><label for="' + input.name + '-select-all">Select All:</label>' + '<input type="checkbox" ' + '' + ' name="' + 'selectAll' + '" id="' + input.name + '-select-all"' + 'value="' + 'selectAll' + '"></div>'); // Bad string concat!
  }

  if (input.selectNone === true) {
    $('.control-label[for="' + input.name + '"]').after('<div class="controls"><label for="' + input.name + '-select-none">Select None:</label>' + '<input type="checkbox" ' + '' + ' name="' + 'selectAll' + '" id="' + input.name + '-select-none"' + 'value="' + 'selectAll' + '"></div>'); // Bad string concat!
  }

  return callback(null, $.html());
};
