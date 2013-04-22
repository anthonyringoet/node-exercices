var profiles = require('./profiles');
// xml2js crazy init method
var xml2js = new (require('xml2js')).Parser();

// xml's tree like structure
// objects can have objects nested
// define function that van loop through obj and subobj
// then converting all props into parent xml nodes
// and all non-obj values into text xml nodes

function buildXml(rootObj, rootName){
  var xml = "<?xml version='1.0' encoding='UTF-8'?>\n";

  rootName = rootName || 'xml';
  xml += "<" + rootName + ">\n";
  (function traverse(obj){
    // get keys of obj and loop through array
    // with native forEach
    Object.keys[obj].forEach(function(key){
      var open = "<" + key + ">",
          close = "</" + key + ">\n",
          isTxt = (obj[key] && {}.toString.call(obj[key]) !== "[object Object]");
      xml += open;
      if (isTxt){
        xml += obj[key];
        xml += close;
      }
    });
  }(rootObj));

  xml += "</" + rootName + ">";
  return xml;
}