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

        data.forEach(function(record){

          var label = record.title || record.name || record.id;

          var leading;
          if (options.id) {
            leading = '../';
          }
          else {
            leading = './';
          }

          output += ('<tr>'
                 +     '<td><a href="' + 'get/' + record.id +'">' + label + '</a></td>'
//                 +     '<td><a href="' + leading + 'update/'  + record.id + '">' + 'update' + '</a></td>'
                 +     '<td><a href="?'  + 'destroy=true&id='  + record.id + '">' + 'destroy' + '</a></td>'
                 +   '</tr>');
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
