cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-logcat/www/logcat.js",
        "id": "cordova-plugin-logcat.LogCat",
        "pluginId": "cordova-plugin-logcat",
        "clobbers": [
            "plugin.logcat"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-browsersync": "0.1.7",
    "cordova-plugin-logcat": "0.0.1"
}
// BOTTOM OF METADATA
});