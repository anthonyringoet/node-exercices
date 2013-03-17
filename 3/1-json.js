// js suffix is optional
var profiles = require('./profiles');

// https://developer.mozilla.org/en-US/docs/Using_native_JSON
// regex for 'name' -> 'fullname'
profiles = JSON.stringify(profiles).replace(/name/g, 'fullname');

console.log('log JSON string:\n----------------\n' + profiles);