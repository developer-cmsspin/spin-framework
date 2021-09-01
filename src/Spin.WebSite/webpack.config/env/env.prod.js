/**
 * mode Producction
 * copy paste files in folder dist-front
 */
const Path = require('path');

module.exports = {
  path: require("../pathsConfiguration.json"), /*  file path config */
  mode: "production",
  devtool: false,
  watch: false,
  copyFiles: [
    /* Themes copy Images folder wwwroot */
    {
      from: "./Spin/Themes/**/Resource/img/**/*",
      to({ context, absoluteFilename }) {

        let spliName = Path.dirname(absoluteFilename).split("Themes")[1].replace("/", "");
        let theme = spliName.split("/")[0];
        let route = `img/${theme}/[name].[ext]`;

        return Promise.resolve(route);
      },
    },

    /* Modules copy Images folder wwwroot */
    // {
    //   from: "./Spin/Module/**/Resource/img/**/*",
    //   to({ context, absoluteFilename }) {

    //     let spliName = Path.dirname(absoluteFilename).split("Module")[1].replace("/", "");
    //     let theme = spliName.split("/")[0];
    //     let route = `img/${theme}/[name].[ext]`;

    //     return Promise.resolve(route);
    //   },
    // },

    /* imageintlTelInputcss:: copy img css to wwwroot for intlTelInput.min.css reference*/
    {
      from: "./node_modules/intl-tel-input/build/img/*",
      to: "css/img/[name].[ext]"
    },
    /* copy lib js folder wwwroot */
    { from: "./node_modules/intl-tel-input/build/js/intlTelInput.min.js", to: "js/lib/[name].[ext]" },
    { from: "./node_modules/cropperjs/dist/cropper.min.js", to: "js/lib/[name].[ext]" },
    { from: "./node_modules/fullcalendar/main.min.js", to: "js/lib/fullcalendar.[ext]" },

    /* libcss:: copy lib css to wwwroot */
    { from: "./node_modules/intl-tel-input/build/css/intlTelInput.min.css", to: "css/lib/[name].[ext]" },
    { from: "./node_modules/cropperjs/dist/cropper.min.css", to: "css/lib/[name].[ext]" },
    { from: "./node_modules/aos/dist/aos.css", to: "css/lib/[name].[ext]" },
    { from: "./node_modules/fullcalendar/main.min.css", to: "css/lib/fullcalendar.[ext]" },
    /* Fonts */
    // {
    //   from: "./Spin/Themes/Shared/Resource/fonts",
    //   to: "fonts"
    // },
  ]
};