/**
 * developer mode not copy/paste files
 * only compile
 */
const Path = require('path');

module.exports = {
    path: require("../pathsConfiguration.json"), /*  file path config */
    mode: "development", /* mode (development|production)*/
    devtool: "source-map", /*  (source-map|false) */
    watch: true, /*  (false|true) */
    copyFiles: []
  };