angular.module("uib/template/accordion/accordion-group.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/accordion/accordion-group.html",
    "<div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"card-header\" ng-keypress=\"toggleOpen($event)\">\n" +
    "  <h5 class=\"mb-0\">\n" +
    "    <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::cardId}}\" tabindex=\"0\" class=\"accordion-toggle\"  ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\" ng-disabled=\"isDisabled\" uib-tabindex-toggle><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "  </h5>\n" +
    "</div>\n" +
    "<div id=\"{{::cardId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabcard\" class=\"card-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "  <div class=\"card-body\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);
