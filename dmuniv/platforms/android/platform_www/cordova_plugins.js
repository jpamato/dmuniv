cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-logcat.LogCat",
    "file": "plugins/cordova-plugin-logcat/www/logcat.js",
    "pluginId": "cordova-plugin-logcat",
    "clobbers": [
      "plugin.logcat"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-browsersync": "0.1.7",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-logcat": "0.0.1"
};
// BOTTOM OF METADATA
});