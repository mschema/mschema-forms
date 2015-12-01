var mschema = require('mschema');

module['exports'] = function (options, callback) {

 options = options || {};
 var schema = options.schema;

 var $ = this.$,
     self = this,
     output = '',
     entity = options.resource || 'unknown';

  showForm(options.data);

  function showForm (data, errors) {
    $('form').attr('action', options.action || "");
    $('legend').html(options.form.legend);

    if (data.length > 0) {

      $('.message').remove();

      // grid headers
      output += '<tr>';
      //output += '<th>ID</th>';

      // fill in row values
      for (var p in schema) {
        if (schema[p].format === "hidden") {
          continue;
        }
        var header = schema[p].label || p;
        output += '<th>' + header +  '</th>';
      }

      output += '<th>&nbsp;</th>';

      // TODO: make destroy link configurable

      output += '</tr>';

      data.forEach(function(record){

        var label = record.title || record.name || record.id;

        var leading;
        if (options.id) {
          leading = '../';
        }
        else {
          leading = './';
        }

        // TODO: replace hard-coded rows with an mschema
        output += '<tr>';

        // fill in row values
        for (var p in schema) {
          if (schema[p].format === "hidden") {
            continue;
          }

          var str = record[p];
          // TODO: move formatter code into mschema itself?
          if (typeof schema[p].formatter === "function") {
            str = schema[p].formatter(str);
          }

          if (schema[p].format === "checkbox") {
            output += '<td>';
              output += '<ul>';
              str.split(',').forEach(function(r){
                output += '<li>';
                  output += r;
                output += '</li>';
              });
              output += '</ul>';

            output += '</td>';
            continue;
          }
          output += '<td>' + str +  '</td>';
        }

        // TODO: make destroy link configurable
        output += '<td><a href="?'  + 'destroy=true&id='  + record.id + '">' + 'destroy' + '</a></td>';
        output += '</tr>';

      });

      $('h1').html(entity);
      $('.records').html(output);
      //$('.schema').html(JSON.stringify(r.schema.properties, true, 2));
      $('.create').html('Create new ' + entity);
      $('.create').attr('href', '/' + entity + '/new');

      if (data.length === 0) {
        $('table').remove();
      }

    } else {
      $('table').remove();
      $('.message').html('no records found');
    }

    output = $.html();
    return callback(null, output);

  }

}
