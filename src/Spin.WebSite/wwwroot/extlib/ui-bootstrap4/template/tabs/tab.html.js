angular.module("uib/template/tabs/tab.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/tabs/tab.html",
    "<li class=\"uib-tab nav-item\">\n" +
    "  <a href ng-click=\"select($event)\" ng-class=\"[{active: active, disabled: disabled}, classes]\" class=\"nav-link\" uib-tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);
