angular.module("uib/template/carousel/carousel.html", []).run(["$templateCache", function ($templateCache) {
  $templateCache.put("uib/template/carousel/carousel.html",
    "<div class=\"carousel-inner\" ng-transclude></div>\n" +
    "<a role=\"button\" href class=\"carousel-control-prev\" ng-click=\"prev()\" ng-class=\"{ disabled: isPrevDisabled() }\" ng-show=\"slides.length > 1\">\n" +
    "    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n" +
    "    <span class=\"sr-only\">Previous</span>\n" +
    "</a>\n" +
    "<a role=\"button\" href class=\"carousel-control-next\" ng-click=\"next()\" ng-class=\"{ disabled: isNextDisabled() }\" ng-show=\"slides.length > 1\">\n" +
    "    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n" +
    "    <span class=\"sr-only\">Next</span>\n" +
    "</a>\n" +
    "<ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
    "  <li ng-repeat=\"slide in slides | orderBy:indexOfSlide track by $index\" ng-class=\"{ active: isActive(slide) }\" ng-click=\"select(slide)\">\n" +
    "    <span class=\"sr-only\">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if=\"isActive(slide)\">, currently active</span></span>\n" +
    "  </li>\n" +
    "</ol>\n" +
    "");
}]);
