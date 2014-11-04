var forms = require('../');

var forms = require('../');

// as object
forms.generate({
  type: "generic",
  form: {
    legend: "My Form"
  },
  schema: {
    url: { type: "string", default: "http://mschema.org" },
    height: { type: "number", default: 0 },
    image: { type: "file" }
    } 
  }, function (err, result){
    console.log(result);
})

return;

// as string properties
forms.generate({
  type: "generic",
  form: {
    legend: "My Form"
  },
  schema: {
    "url": "string",
    "height": "number",
    "image": "file"
    } 
  }, function (err, result){
    console.log(result);
})