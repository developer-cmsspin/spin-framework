angular.module('sticky', [])
.service('Sticky', ['$timeout', function($timeout) {
  var stickyElements = [];

  function setAnchorAttrs($elem) {
    $elem.data('stickyAnchorWidth', window.getComputedStyle($elem.parent()[0], null).getPropertyValue('width'));
    $elem.data('stickyAnchorHeight', window.getComputedStyle($elem.parent()[0], null).getPropertyValue('height'));
  }

  function check($elem) {
    if ($elem[0].offsetHeight === 0) return; // return if not visible
    var offsetTop = $elem.data('stickyOffset');

    if ($elem.parent()[0].getBoundingClientRect().top - offsetTop <= 0 ) {
      $elem.css({ top: offsetTop + 'px', position: 'fixed', width: $elem.data('stickyAnchorWidth') });
      $elem.parent().css({ height: $elem.data('stickyAnchorHeight') }); // prevent visual reflow
      if (!$elem.hasClass('stuck')) $elem.addClass('stuck');
    } else {
      $elem.css({ top: '', position: '', width: '' });
      $elem.parent().css({ height: '' });
      if ($elem.hasClass('stuck')) $elem.removeClass('stuck');
    }
  }

  return {
    add: function($elem, offset) {
      $elem.wrap("<div class='sticky-anchor'></div>");
      $elem.data('stickyOffset', offset);
      stickyElements.push($elem);
      setAnchorAttrs($elem);
    },
    reflow: function() {
      $timeout(function() {
        stickyElements.forEach(function($elem) {
          setAnchorAttrs($elem);
          check($elem);
        });
      });
    },
    check: check
  }
}])
.directive('sticky', ['Sticky', '$timeout', function(Sticky, $timeout) {
  return {
    restrict: 'A',
    scope: {
      offset: '@',
    },
    link: function($scope, $elem, $attrs) {
      $timeout(function() {
        var offsetTop = $scope.offset || 0;
        var $window = angular.element(window);

        Sticky.add($elem, offsetTop);

        $window.on('scroll', function() {
          window.requestAnimationFrame(function() {
            Sticky.check($elem);
          });
        });
      });
    }
  };
}]);
