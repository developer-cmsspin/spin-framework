!function (angular, undefined) {
    'use strict';

    angular.module('ngLocationUpdate', [])
        .run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
            $location.update_path = function (path, keep_previous_path_in_history, searchObject) {
                if ($location.path() == path && angular.equals(searchObject, $location.search())) return;

                var routeToKeep = $route.current;
                $rootScope.$on('$locationChangeSuccess', function () {
                    if (routeToKeep) {
                        $route.current = routeToKeep;
                        routeToKeep = null;
                    }
                });

                $location.path(path).search(searchObject);
                if (!keep_previous_path_in_history) $location.replace();
            };
        }]);

}(window.angular);


/*Information Standar Module and configuration*/
var module = $("#module").val();
var controller = $("#controller").val();
var action = $("#action").val();
var segment = $("#segment").val();
var totalCount = $("#TotalCountRows").val();
var quantityPerChangeSelectAll = 500; /*Change pagination server mayor to*/
var itemPerPage = ($("#itemPerPage").val() != undefined) ? $("#itemPerPage").val() : 50;
var MaxPageShowInterface = 9;
var isLoadPage = false;


var URLServiceAll = '';
if ($("#URLServiceAll").val() == undefined || $("#URLServiceAll").val() == '') {
    URLServiceAll = "/" + segment + "/" + module + "/" + controller + "/SelectAll";
} else {
    URLServiceAll = $("#URLServiceAll").val();
}

var arr_filterBoolean = new Array();// { name: "undefined", value: true/false }; 
  

/*Plugin controls*/
var PluginControlsSelect = [];
var PluginControlsDetail = [];


/*Define Directive*/
var directives = ['ngRoute', 'angularUtils.directives.dirPagination', 'ngSanitize', 'ui.bootstrap',
    'ui.date', 'spin.validator', 'spin.uploadFile', 'spin.translate', 'spin.geolocation', 'sticky',
    'angucomplete-alt', 'ngLocationUpdate', 'jsTree.directive','angular.filter'];

if (typeof directivesExtend !== 'undefined' && directivesExtend != null) {
    $.each(directivesExtend, function (key, value) {
        directives.push(value);
    });
}



/*Define module*/
var spinAppModule = angular.module('SpinApp', directives);

/* Alias lowercase for textangular lib */
angular.module('SpinApp').config(function () {
    angular.lowercase = angular.$$lowercase;
});

/* add functions module */
if (typeof (addModuleFn) !== 'undefined') {
    addModuleFn(spinAppModule);
}



/*for loop*/
spinAppModule.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});


spinAppModule.directive('filterBoolean', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function (val) {
                if (val != undefined) {
                    var filterBoolean = arr_filterBoolean.filter(x => x.name === attrs.id);
                    if (filterBoolean.length == 0) {
                        arr_filterBoolean.push({ name: attrs.id, value: Boolean(JSON.parse(val)) });
                    } else {
                        filterBoolean[0].value = Boolean(JSON.parse(val));
                    }
                }
            });
        }
    };
});


/*no image*/
spinAppModule.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});


/* Format Time */
spinAppModule.filter('secondsToDateTime', function () {
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
});

/*use dd slick*/
spinAppModule.directive('angularDdslick', function ($parse) {
    return {
        restrict: 'A',

        link: function (scope, elem, attr, ctrl) {
            var selectfn = attr.angularDdslickOnselect;
            var model = $parse(attr.angularDdslick);

            $(elem).attr("id", attr.id);
            $(elem).attr("name", attr.name);
            var nameSl = $(elem).attr("id");
            $(elem).attr("init", "true");

            elem.ddslick({
                background: '#FFF',
                width: '100%',
                imagePosition: "left",
                selectText: "Select your data",
                onSelected: function (data) {
                    if ($(elem).attr("init") != "true" && isLoadPage) {
                        if (model.constant == false) {
                            model.assign(scope, elem.val());
                        }

                        if (selectfn != undefined) {
                            eval("scope." + selectfn + "(elem,data)");
                        }
                    }

                    $("#" + elem.attr("id")).attr("spin-name", $(elem).attr("spin-name"));

                    if (typeof (attr.required) != "undefined" && $("#" + elem.attr("id")).is(':visible')) {
                        if (scope.form != undefined) {
                            if (elem.val() != "" && elem.val() != "-1" && elem.val() != "0") {
                                $("#" + elem.attr("id")).addClass("ng-valid ng-valid-required");
                                $("#" + elem.attr("id")).removeClass("ng-invalid ng-invalid-required");
                                eval("scope.form." + elem.attr("id") + ".$setValidity('required', true);");
                                eval("scope.form." + elem.attr("id") + ".$invalid = false");
                                eval("scope.form." + elem.attr("id") + ".$setViewValue('" + elem.val() + "');");
                            }
                            else {
                                $("#" + elem.attr("id")).removeClass("ng-valid ng-valid-required");
                                $("#" + elem.attr("id")).addClass("ng-invalid ng-invalid-required");
                                eval("scope.form." + elem.attr("id") + ".$setValidity('required', false);");
                                eval("scope.form." + elem.attr("id") + ".$invalid = true");
                                eval("scope.form." + elem.attr("id") + ".$setViewValue(null);");
                            }
                        }

                    }

                    $(elem).attr("init", "false");

                }
            });

            scope.$watch(model, function (newNames, oldNames) {
                if (newNames != undefined && newNames != elem.val()) {
                    elem.val(newNames);
                    /*Search Index */
                    var indexData = 0;
                    var contentItem = false;

                    $.each($("#" + nameSl + " ul input"), function (key, value) {
                        if ($(value).val() == newNames) {
                            contentItem = true;
                            return false;
                        }
                        indexData++;
                    });

                    if (contentItem)
                        $("#" + nameSl).ddslick('select', { index: indexData })

                }
            });
        }
    }
});

spinAppModule.directive('searchValue', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {

            $(element).bind("keyup change", function (e) {

                scope.$apply(function () {

                    var filterSelected = $(".dd-selected-value").val();

                    if ($(element).val() != "") {
                        eval("scope.itemListFilter." + filterSelected.charAt(0).toLowerCase() + filterSelected.slice(1) + "='" + $(element).val() + "'");
                        eval("scope.itemTagFilter." + filterSelected.charAt(0).toLowerCase() + filterSelected.slice(1) + "='" + $(element).val() + "'");
                    }
                    else {
                        scope.clearFilter(filterSelected.charAt(0).toLowerCase() + filterSelected.slice(1));
                    }
                });
            });

        }
    };
});

/*use dd slick*/
spinAppModule.directive('dateRangePicker', function ($parse) {
    return {
        restrict: 'A',

        link: function (scope, element, attr, ctrl) {

            var options = eval("scope." + attr.dateRangePicker);
            if (options == undefined) {
                options = scope.dateRangeOptions;
            }
            element.daterangepicker(
                options,
                function (start, end, label) {
                    element.val(moment(start).format('YYYY-MM-DDTHH:mm:ss') + " # " + moment(end).format('YYYY-MM-DDTHH:mm:ss'));
                    $(element).change();
                    element.val("");
                });
        }
    }
});



/*convert number to select*/
spinAppModule.directive('convertToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                var intData = parseInt(val, 10);
                if (isNaN(intData))
                    return null;
                else
                    return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                if (val == undefined || val === null)
                    return null;
                else
                    return '' + val;
            });
        }
    };
});

spinAppModule.directive('tintColor', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (typeof setColor !== 'undefined' && typeof setColor === 'function') {
                    setColor(element, attrs.tintColor);
                }
            }
        }
    }
);

/*Add Routes*/
spinAppModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.
        when('/select', {
            templateUrl: 'select.htm',
            controller: 'SpinControllerSelect'
        }).
        when('/detail/:id', {
            templateUrl: 'detail.htm',
            controller: 'SpinControllerDetail'
        }).
        otherwise({
            redirectTo: '/select'
        });
}]);


/*Define controller  select*/
spinAppModule.controller('SpinControllerSelect', function SpinControllerSelect($scope, $filter, $http, $log, $location) {
    /*eventLoad*/
    isLoadPage = false;
    $scope.$on('$viewContentLoaded', function () {
        isLoadPage = true;

        if ($scope.loadPageSelect != undefined) {
            $scope.loadPageSelect($scope, response);
        }
    });

    /* validate admin */
    $scope.isAdmin = ($("#isAdmin").val() == "true") ? true : false;

    /*LoadFilter*/
    $scope.loadFilter = function () {
        var listParameter = $location.search();
        $scope.itemListFilter = {};
        $scope.itemTagFilter = {};

        $.each(listParameter, function (key, value) {
            $scope.itemListFilter[key] = value;
            $('#slFilterField').find('option').each(function () {
                if ($(this).val().toLowerCase() == key.toLowerCase()) {
                    $scope.itemTagFilter[key] = (key != "reload" ? (value.toString() == "false" ? "No " + key : (value.toString() == "true" ? key : value)) : value);
                }
            });
            //Add deatecreate filter from icon
            if (key.toLowerCase() == "datecreate") {
                $scope.itemTagFilter[key] = value;
            }

        });
    }
    $scope.loadFilter();

    $scope.clearFilter = function (key) {

        delete $scope.itemListFilter[key];
        delete $scope.itemListFilter[key + "Value"];
        delete $scope.itemTagFilter[key];
        $scope.updateSearch();

        arr_filterBoolean.splice(arr_filterBoolean.indexOf(key),1);

        if (!$scope.useSelectAll) {
            $scope.changeFilter();
            $location.update_path('/select', true, $scope.itemListFilter);
        }

        // Clear filter-box and filter calendar
        if (key.toLowerCase() == "datecreate") {
            $("#DateCreateFilter").data("daterangepicker").setStartDate(moment(Date().now).format('MM/DD/YYYY'));
            $("#DateCreateFilter").data("daterangepicker").setEndDate(moment(Date().now).format('MM/DD/YYYY'));
        }
    }

    $scope.formatFilterValue = function (key, value) {
        if (value != undefined && value.length > 3 && value.split('#').length == 2) {
            var range = value.split('#');
            var startDate = new Date(range[0].trim());
            var endDate = new Date(range[1].trim());
            if (Date.parse(startDate) > 0 && Date.parse(endDate) > 0) {
                if (startDate == endDate) {
                    return moment(startDate).format('LL');
                }
                else {
                    return moment(startDate).format('LL') + " - " + moment(endDate).format('LL');
                }
            }
        }
        else if (value != undefined && Date.parse(value) > 0 && value.indexOf('-') > 0) {
            var startDate = new Date(value.trim());
            if (Date.parse(startDate) > 0) {
                return moment(startDate).format('LL');
            }
        }
        else {
            return value;
        }

    }

    $scope.updateSearch = function () {

        var filterSelected = $(".dd-selected-value").val();
        $(".filter-container input").each(function () {
            $(this).hide();
        });
        $(".filter-container select").each(function () {
            $(this).hide();
        });
        $("#" + filterSelected).show();
        $("#" + filterSelected + "_value").show();
        $("#" + filterSelected).val("");
    }

    $scope.selectedEstate = function (selected) {
        if (selected != undefined) {
            var obj = selected.originalObject;
            $scope.itemListFilter.IdEstate = obj.id;
            $scope.itemListFilter.IdEstateValue = obj.value;
            $scope.itemTagFilter.IdEstate = obj.value;
        }
    }

    /*variable*/
    totalCount = $("#TotalCountRows").val();
    $scope.useSelectAll = (totalCount < quantityPerChangeSelectAll);

    /*call service*/
    $scope.callSelectAll = function (useLoading = true) {

        if ($scope.itemListFilter.reload != undefined)
            useLoading = !$scope.itemListFilter.reload;
        
        if (useLoading) {
            helperSpin.showLoading();
        }
        else {
            $(".btn-refresh").addClass("upload-action");
        }

        $http.get(URLServiceAll).then(
            function (response) {
                $scope.entityList = response.data.result;

                if ($scope.loadSelectAfter != undefined) {
                    $scope.loadSelectAfter($scope, response);
                }

                if (useLoading) {
                    helperSpin.hideLoading();
                }
                else {
                    $(".btn-refresh").removeClass("upload-action");
                }

            },
            function (response) {
                messagesSpin.showMessage("Error get data", "error");

                if (useLoading) {
                    helperSpin.hideLoading();
                }
                else {
                    $(".btn-refresh").removeClass("upload-action");
                }

            });
    }

    /*call service*/
    $scope.callSelectAllPerPage = function (pageNumber, useLoading = true) {

        if ($scope.itemListFilter.reload != undefined) {
            useLoading = !$scope.itemListFilter.reload;
            helperSpin.hideLoading();
        }

        /*review object is same*/
        if ($scope.filterCopy === $scope.itemListFilter && $scope.itemListFilter != undefined) {
            return;
        }


        if (useLoading) {
            helperSpin.showLoading();
        }
        else {
            $(".btn-refresh").addClass("upload-action");
            $("#loadingTop").addClass("loading-show");
        }

        /* not send null value server*/
        var arrayDeleteItems = new Array();
        $.each($scope.itemListFilter, function (key, value) {
            if (value == null)
                arrayDeleteItems.push(key);
        });

        $("#btnImgLoadingSearch").show();
        $("#iconSearch").hide();


        $.each(arrayDeleteItems, function (key, value) {
            delete $scope.itemListFilter[value];
        });


        var requestFilter = [];
        $.each($scope.itemListFilter, function (key, value) {
            if (value != null) {
                requestFilter.push({ Name: key, Value: value });
            }
        });

        if ($scope.itemListFilter.page != null && $scope.itemListFilter.page != undefined) {
            pageNumber = $scope.itemListFilter.page;
            $scope.currentPageNumber = parseInt($scope.itemListFilter.page);
        }

        var jsonData = JSON.stringify({ page: pageNumber, filter: requestFilter, itemsPerPage: itemPerPage });
        $http.post("/" + segment + "/" + module + "/" + controller + "/SelectAllPerPage", jsonData).then(
            function (response) {
                $scope.entityList = response.data.result;
                totalCount = response.data.totalItems;
                $scope.buildPagination();

                $("#btnImgLoadingSearch").hide();
                $("#iconSearch").show();

                if (useLoading) {
                    helperSpin.hideLoading();
                }
                else {
                    $(".btn-refresh").removeClass("upload-action");
                    $("#loadingTop").removeClass("loading-show")
                }

                if ($scope.itemListFilter == undefined) {
                    $scope.itemListFilter = {};
                    $scope.itemTagFilter = {};
                }

                $scope.filterCopy = JSON.parse(JSON.stringify($scope.itemListFilter));
                                
                if ($scope.loadSelectAfter != undefined) {
                    $scope.loadSelectAfter($scope, response, $location, $http);
                }
                
            },
            function (response) {


                messagesSpin.showMessage("Error get data", "error");

                $("#btnImgLoadingSearch").hide();
                $("#iconSearch").show();

                if (useLoading) {
                    helperSpin.hideLoading();
                }
                else {
                    $(".btn-refresh").removeClass("upload-action");
                    $("#loadingTop").removeClass("loading-show");
                }


            });
    }


    /*hover delete*/
    $scope.hoverIn = function (index) {
        $("#item" + index).addClass("icon-delete-item-hover");
    };

    $scope.hoverOut = function (index) {
        $("#item" + index).removeClass("icon-delete-item-hover");
    };


    /*ChangeView*/
    $scope.changeView = function (view) {
        $('.mdl-layout__content').scrollTo(0, 0);
        $('.modal-backdrop').remove();

        //not show banner
        messagesSpin.hideMessageConfirm();
        messagesSpin.hideMessage();

        $location.path(view);
    }

    /*Delete*/
    $scope.delete = function (item) {

        messagesSpin.showMessageConfirm("Are you delete this element?",
            function () {
                messagesSpin.showMessage("Deleting...", "info", false);

                $http.get("/" + segment + "/" + module + "/" + controller + "/Delete/" + item.id).then(
                    function (response) {
                        var indexDelete = $scope.entityList.indexOf(item);
                        if (indexDelete > -1) {
                            $scope.entityList.splice(indexDelete, 1);
                        }

                        messagesSpin.showMessage("Data deleted", "success");
                    },
                    function (response) {
                        messagesSpin.showMessage("Error delete item", "error");
                    });
            }, null);
    }

    /*Update Files*/
    $scope.updateService = function () {
        $scope.callService(false);
    }

    /*Paging*/
    $scope.currentPage = 1;
    $scope.pageSize = itemPerPage;
    $scope.pageChangeHandler = function (num) {
        if (globalCurrentPage != null && globalCurrentPage != undefined) {
            globalCurrentPage = num;
        }
    };

    /*PagingServer*/
    $scope.currentPageNumber = 1;

    $scope.buildPagination = function () {
        $scope.totalPageNumber = Math.ceil(totalCount / itemPerPage);
        $scope.paginationPages = new Array();
        if ($scope.totalPageNumber < MaxPageShowInterface) {
            for (var indexPage = 0; indexPage < $scope.totalPageNumber; indexPage++) {
                $scope.paginationPages.push(indexPage + 1);
            }
        } else {
            /*previuous number*/
            for (var indexPage = Math.round(MaxPageShowInterface / 2); indexPage > 0; indexPage--) {
                var itemNumber = $scope.currentPageNumber - indexPage;
                if (itemNumber > 0 && itemNumber != $scope.currentPageNumber) {
                    $scope.paginationPages.push(itemNumber);
                }
            }

            /*Actual Page*/
            $scope.paginationPages.push($scope.currentPageNumber);

            /*next number*/
            for (var indexPage = 0; indexPage < Math.round(MaxPageShowInterface / 2); indexPage++) {
                var itemNumber = $scope.currentPageNumber + indexPage;
                if (itemNumber < $scope.totalPageNumber && itemNumber != $scope.currentPageNumber) {
                    $scope.paginationPages.push($scope.currentPageNumber + indexPage);
                }
            }

            /*Complete numbers*/
            if ($scope.paginationPages[0] == "1") {
                for (var indexPage = $scope.paginationPages.length; indexPage < MaxPageShowInterface; indexPage++) {
                    var itemNumber = $scope.currentPageNumber + indexPage;
                    if (itemNumber < $scope.totalPageNumber && itemNumber != $scope.currentPageNumber) {
                        $scope.paginationPages.push($scope.currentPageNumber + indexPage);
                    }
                }
            }
            if ($scope.paginationPages[$scope.paginationPages.length - 1] == $scope.totalPageNumber) {
                for (var indexPage = $scope.paginationPages.length; indexPage < MaxPageShowInterface; indexPage++) {
                    var itemNumber = $scope.currentPageNumber - indexPage;
                    if (itemNumber > 0 && itemNumber != $scope.currentPageNumber) {
                        $scope.paginationPages.unshift(itemNumber);
                    }
                }
            }

            /*complete with ...*/
            if ($scope.paginationPages[0] != "1") {
                $scope.paginationPages.unshift('...');
            }
            if ($scope.paginationPages[$scope.paginationPages.length - 1] != $scope.totalPageNumber) {
                $scope.paginationPages.push('...');
            }

        }

    }


    $scope.changePage = function (page, addPage) {

        page = parseInt(page);

        if (addPage) {
            page = parseInt(page) + addPage;
        }

        $scope.itemListFilter.page = page;

        $location.update_path('/select', true, $scope.itemListFilter);

        if (!$scope.useSelectAll) {
            $scope.callSelectAllPerPage(page, false);
            $scope.currentPageNumber = page;
        }
    }


    /*filter*/
    $scope.changeFilter = function (name) {
        if (name != undefined) {
            $scope.currentPageNumber = 1;
        }

        $scope.itemListFilter.reload = true;
        
        for (var i = 0; i < arr_filterBoolean.length; i++) {
            $scope.itemListFilter[arr_filterBoolean[i].name] = arr_filterBoolean[i].value;
            $scope.itemTagFilter[arr_filterBoolean[i].name] = arr_filterBoolean[i].value ? arr_filterBoolean[i].name : "No " + arr_filterBoolean[i].name;
        }
        
        $location.update_path('/select', true, $scope.itemListFilter);
        $scope.callSelectAllPerPage($scope.currentPageNumber, false);
    };


    $scope.filterToggle = function () {
        $('#filter').toggleClass("is-visible");
    };



    /*Date*/
    $scope.dateOptions = {
        dateFormat: 'yy-mm-dd',
        onClose: function (value, picker, $element) {
            $($element).change();
            $($element).blur();
        }
    };

    /*DateRange Options*/
    $scope.dateRangeOptions = {
        showDropdowns: true,
        autoApply: true,
        minYear: 2012,
        minDate: "01/01/2010",
        autoUpdateInput: false,
        timePicker: true,
        buttonClasses: "btn btn-sm btn-calendar"
    };


    /*Sort*/

    $scope.sortBy = function (propertyName) {
        $scope.propertyName = propertyName;
    };

    $scope.reverse = false;
    $scope.orderBy = function () {
        $scope.reverse = !$scope.reverse;
    };

    /*Call Select*/
    $scope.callService = function () {
        /*init Call*/
        if ($scope.useSelectAll)
            $scope.callSelectAll();
        else {
            $scope.callSelectAllPerPage(1);
        }

    }


    /*selected input*/
    $scope.selectedInput = function (control) {
        $(control).parent().parent().toggleClass("select-input");
    };

    /*ExtendMethod*/
    if (typeof ExtendAdminSelect === "function") {
        ExtendAdminSelect($scope, $http, $filter, $location);
    }

    /*Call Base*/
    $scope.callService();

});

/* *********************************************   DETAIL   ************************************* */

/*Define controller  detail*/
spinAppModule.controller('SpinControllerDetail', function SpinControllerDetail($scope, $http, $routeParams, $log, $location, $filter , $interval) {

    /*Load*/
    /*eventLoad*/
    isLoadPage = false;
    $scope.$on('$viewContentLoaded', function () {
        isLoadPage = true;

        if ($scope.loadPageDetail != undefined) {
            $scope.loadPageDetail($scope, response);
        }
        /**/
        $scope.form.$rollbackViewValue();
    });

    $scope.isAdmin = ($("#isAdmin").val() == "true") ? true : false;

    /* quit internal required */
    $.each($(".detail-master-detail"), function (key, value) {
        $(value).find(':input[required]').attr('spin-required', '');
        $(value).find(':input[required]').removeAttr('required');

        $(value).find(':input').blur(function () {
            $scope.validateSubTable($(value).attr('spin-name-content'));
        });
    });

    $scope.loadFilter = function () {
        var listParameter = $location.search();
        $scope.itemListFilter = {};
        $scope.itemTagFilter = {};

        $.each(listParameter, function (key, value) {
            $scope.itemListFilter[key] = value;
            $scope.itemTagFilter[key] = value;
        });
    }
    $scope.loadFilter();


    helperSpin.showLoading();
    $http.get("/" + segment + "/" + module + "/" + controller + "/DetailItem/" + $routeParams.id).then(
        function (response) {
            $scope.entity = response.data;

            if ($scope.entity === "")
                $scope.entity = {};

            if ($scope.entity.id <= 0) {
                $(".spin-text-detail-not-show").hide();

                if ($scope.entity.spinTranslates !== undefined) {
                    $scope.entity.spinTranslates = new Array();
                }
            }

            if ($scope.loadDetailAfter != undefined) {
                $scope.loadDetailAfter($scope, response);
            }

            $scope.closeAllSubtable();

            helperSpin.hideLoading();
            /*load control data*/
            $scope.loadControlDetail();

            /* order history */
            $scope.orderHistoryLabel();
        },
        function (response) {
            messagesSpin.showMessage("Error get data", "error");
            helperSpin.hideLoading();
        });

    /*Save*/
    $scope.save = function () {
        if (!$scope.form.$invalid) {
            messagesSpin.showMessage("Saving ....", "info", false);

            if ($scope.saveBefore != undefined) {
                $scope.saveBefore($scope);
            }

            $http.post("/" + segment + "/" + module + "/" + controller + "/Save", $scope.entity).then(
                function (response) {
                    $scope.entity = response.data;
                    messagesSpin.showMessage("Data saved", "success");
                    $scope.changeView('detail/' + $scope.entity.id);

                    if ($scope.saveAfter != undefined) {
                        $scope.saveAfter($scope, response);
                    }

                    $scope.closeAllSubtable();

                    /* order history */
                    $scope.orderHistoryLabel();

                    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                        $scope.$apply($scope.entity);
                    }
                },
                function (response) {
                    messagesSpin.showMessage("Error save data", "error");
                });
        }

    }

    $scope.changeValue = function (itemName, valueData) {
        eval("$scope." + itemName + "='" + valueData + "';");
    }



    /*ChangeView*/
    $scope.changeView = function (view) {
        
        //not show banner
        messagesSpin.hideMessageConfirm();
        messagesSpin.hideMessage();

        $('.modal-backdrop').remove();
        $location.path(view);
    }

    /*Delete*/
    $scope.delete = function (item) {

        messagesSpin.showMessageConfirm("Are you delete this element?",
            function () {
                messagesSpin.showMessage("Deleting...", "info", false);

                if (item == undefined) {
                    item = $scope.entity;
                }

                $http.get("/" + segment + "/" + module + "/" + controller + "/Delete/" + item.id).then(
                    function (response) {
                        if ($scope.entityList != undefined) {
                            var indexDelete = $scope.entityList.indexOf(item);
                            if (indexDelete > -1) {
                                $scope.entityList.splice(indexDelete, 1);
                            }
                        }

                        messagesSpin.showMessage("Data deleted", "success");
                        $scope.changeView('select')

                    },
                    function (response) {
                        messagesSpin.showMessage("Error delete item", "error");
                    });
            }, null);
    }

    /*Error Manage*/
    $scope.errorName = function (name) {
        return $("#" + name).attr("spin-name");
    }


    /*sub table*/

    $scope.closeAllSubtable = function () {
        $.each($(".detail-master-detail"), function (key, value) {
            $(value).hide();
        });
        $.each($(".select-master-detail"), function (key, value) {
            $(value).show();
        });
    };


    /* =================== SUB TABLE =========================== */
    $scope.showDetailSubTable = function (name, data, value) {


        if (eval("$scope." + data) != undefined && eval("$scope." + data).length > 0) {

            //Order by orderNumber
            eval("$scope." + data).sort(function (a, b) {
                return a.orderNumber - b.orderNumber;
            });

            //Set order number for 0 order
            for (var i = 0; i < eval("$scope." + data).length; i++) {
                if (value != null && value.id == eval("$scope." + data)[i].id) {
                    value.orderNumber = i;
                }

                eval("$scope." + data)[i].orderNumber = i;
            }

            //reorder list
            eval("$scope." + data).sort(function (a, b) {
                return a.orderNumber - b.orderNumber;
            });

        }

        if (value == null) {
            value = {};
            var contentArray = null;
            eval("contentArray = $scope." + data + ";");
            if (contentArray == null) {
                eval("$scope." + data + "=[];");
            }

            value.orderNumber = eval("$scope." + data).length - 1;
        }

        if (value.spinTranslates == null || value.spinTranslates == undefined) {
            value.spinTranslates = [];
        }

        eval("$scope." + name + "SelectData=value;");

        var bckItem = JSON.parse(JSON.stringify(value));
        eval("$scope." + name + "RollBackData=bckItem;");

        $.each($("#subTableDetail" + name + " :input"), function (key, value) {
            var intpuValue = $(value);
            if (intpuValue.attr("spin-required") != undefined) {
                intpuValue.attr('required', '')
            }
        });

        $("#subTableSelect" + name).hide();
        $("#subTableDetail" + name).show();

        $("#subTableDetail" + name).find("input")[0].focus();

        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            eval("$scope.$apply($scope." + data + ")");
        }


    }

    $scope.showSelectSubTable = function (name, data) {
        var validateForm = $scope.validateSubTable(name);
        if (validateForm) {

            /*Quit Required*/
            $.each($("#subTableDetail" + name + " :input"), function (key, value) {
                var intpuValue = $(value);
                if (intpuValue.attr("spin-required") != undefined) {
                    intpuValue.removeAttr('required');
                }
            });

            $scope.form.$setValidity();

            $("#subTableDetail" + name).hide();
            $("#subTableSelect" + name).show();

            var value;
            var indexItem;
            eval("value = $scope." + name + "SelectData;");
            eval("indexItem = $scope." + data + ".indexOf(value)");

            if (indexItem == -1) {
                value.id = 0;
                value = JSON.parse(JSON.stringify(value));
                eval("$scope." + data + ".push(value);");
            }
            messagesSpin.hideMessageConfirm();
        } else {
            messagesSpin.showMessageConfirm("Are you return list?", function () {
                $.each($("#subTableDetail" + name + " input"), function (key, value) {
                    var intpuValue = $(value);
                    if (intpuValue.attr("spin-required") != undefined) {
                        intpuValue.removeAttr('required');
                        eval("$scope.form." + intpuValue.attr("id") + ".$setValidity('required', true);");
                        eval("$scope.form." + intpuValue.attr("id") + ".$invalid = false;");
                    }
                });

                eval("var value = $scope." + name + "SelectData;");
                eval("var indexItem = $scope." + data + ".indexOf(value)");
                eval("$scope." + data)[indexItem] = null;
                eval("$scope." + data)[indexItem] = eval("$scope." + name + "RollBackData;");

                eval("$scope." + name + "SelectData=null;");
                eval("$scope." + name + "RollBackData=null;");
                $scope.$apply();

                $scope.form.$setValidity();

                $("#subTableDetail" + name).hide();
                $("#subTableSelect" + name).show();
            });
        }

        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            eval("$scope.$apply($scope." + data + ")");
        }

    }



    $scope.deleteSubTable = function (name, index) {
        messagesSpin.showMessageConfirm("Are you delete this element?", function () {
            eval("$scope." + name + ".splice(index, 1);");
            $scope.$apply();
        });
    };

    $scope.validateSubTable = function (name) {
        var validateForm = true;
        $.each($("#subTableDetail" + name + " :input"), function (key, value) {
            var validateInput = $(value).valid();

            if (validateForm && !validateInput) {
                validateForm = false;
            }
        });

        if (validateForm) {
            $("#errorSubTableDetail" + name + "").hide();
        } else {
            $("#errorSubTableDetail" + name + "").show();
        }

        return validateForm;
    };

    /* =================== END SUB TABLE =========================== */

    /* =================== HISTORY ================================= */

    $scope.history = function () {
        $(".list-history").scrollTop(0);

        $(".mdl-layout__drawer-right-history").addClass("active");
        $(".mdl-layout__obfuscator-right-history").addClass("ob-active");
    }

    $scope.historyClose = function () {
        $(".mdl-layout__drawer-right-history").removeClass("active");
        $(".mdl-layout__obfuscator-right-history").removeClass("ob-active");
    }

    /* Order By date */
    $scope.orderHistoryLabel = function () {
        if ($scope.entity.spinHistory != undefined) {
            $.each($scope.entity.spinHistory, function (keyHistory, valueHistory) {
                var d = new Date(valueHistory.dateCreated);

                valueHistory.dateCreated = d;
                valueHistory.dateOrder = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                valueHistory.description = valueHistory.name;

                try {
                    valueHistory.newDataObject = JSON.parse(valueHistory.newData);
                } catch (e) {

                }

                valueHistory.isObjectNewData = typeof valueHistory.newDataObject === 'object';

                if (valueHistory.oldData != null) {
                    try {
                        valueHistory.oldDataObject = JSON.parse(valueHistory.oldData);
                    } catch (e) {

                    }

                    valueHistory.isObjectOldData = typeof valueHistory.oldDataObject === 'object';
                }


                valueHistory = $scope.completeHistory(valueHistory);

                //Contruir metodo para completar informacion como icono y la informacion que se va a mostrar, si es un objeto revisar como se va a manejar
                //animacion de como se abre y se cierra el history con el boton
            });

            $scope.$watch("entity.spinHistory");

        }
    }

    $scope.completeHistory = function (value) {
        //add information 
        value.icon = '';

        switch (value.typeHistory) {

            case "Add":
                value.icon = 'fas fa-plus';
                value.treeStructure = $scope.createTree(value.newDataObject);
                break;

            case "Change":
                value.icon = 'fas fa-exchange-alt';
                break;

            default:
                value.icon = 'fas fa-question';
                break;
        }

        if ($scope.completeHistoryCustom != undefined) {
            value = $scope.completeHistoryCustom(value, $scope, $http, $routeParams, $log, $location, $filter);
        }
    }

    $scope.createTree = function (value, parent = '#') {
        var result = [];

        try {
            $.each(value, function (name, value) {
                result.push({
                    id: name,
                    parent: parent,
                    text: $scope.maxSizeString((typeof value === 'object') ? name : name + "=" + value,110),
                    icon: "/spin-sys/dist/img/backend/icon-tree.png"
                });

                if (typeof value === 'object') {
                    var newInformation = $scope.createTree(value, name);
                    $.each(newInformation, function (keyNewI, valueNewI) {
                        result.push(valueNewI);
                    });
                }
            });
        } catch (ex) {
            console.log(ex);
        }


        return result;
    }

    /* ================ END HISTORY ================================ */

    /*HELPER*/
    $scope.maxSizeString = function (value, maxSize) {
        if (value.length > maxSize)
            return value.substring(0,maxSize) + "...";
        else
            return value;
    };


    /*videos azure*/
    $scope.getBaseVideoImage = function (urlVideo) {
        var items = urlVideo.split("/");
        items.splice(items.length - 1, 1);
        items.splice(items.length - 1, 1);

        var urlResult = items.join("/");

        return urlResult;
    }

    /*Order*/
    $scope.changeOrder = function (index, sumValue, list) {

        list.sort(function (a, b) {
            return a.orderNumber - b.orderNumber;
        });

        for (var i = 0; i < list.length; i++) {
            list[i].orderNumber = i;
        }


        list[index].orderNumber += sumValue;
        list[index + sumValue].orderNumber -= sumValue;

        list.sort(function (a, b) {
            return a.orderNumber - b.orderNumber;
        });

        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    }

    /*selected input*/
    $scope.selectedInput = function (control) {
        $(control).parent().parent().parent().toggleClass("select-input");
    };


    /*Autocomplete*/
    $scope.autocompleteAssign = function (value) {

    }

    /*Extenal Controls*/
    $scope.loadControlDetail = function () {
        $.each(PluginControlsDetail, function (keyFunction, valueFunction) {
            if (typeof valueFunction === "function") {
                valueFunction($scope, $http, $filter);
            }
        });
    }

    $scope.deleteMultipleSubTable = function (name, list) {

        var n = $("#subTableSelect" + name + " input:checked").length;
        if (n > 0) {
            messagesSpin.showMessageConfirm("Are you delete this element?", function () {

                var entityList = eval("$scope." + list);

                entityList.sort(function (a, b) {
                    return a.orderNumber - b.orderNumber;
                });

                $("#subTableSelect" + name + " input:checked").each(function (index) {
                    entityList.splice((this.value - index), 1);
                });

                for (var i = 0; i < entityList.length; i++) {
                    entityList[i].orderNumber = i;
                }

                entityList.sort(function (a, b) {
                    return a.orderNumber - b.orderNumber;
                });

                $scope.$apply();
            });
        } else {
            messagesSpin.showMessage("Please select an item from list", "error");
        }

    }

    $scope.deleteMultipleGallery = function (type) {

        var n = $(".gallery-list-" + type).find("input:checked").length;

        if (n > 0) {
            messagesSpin.showMessageConfirm("Are you delete these elements?", function () {

                var entityList = eval("$scope.entity.galleries");
                var deleteList = [];

                entityList.sort(function (a, b) {
                    return a.orderNumber - b.orderNumber;
                });

                $(".gallery-list-" + type).find("input:checked").each(function (index) {
                    var id = this.value;
                    $.each(entityList, function (key, value) {
                        if (value != undefined && value.idMedia == parseInt(id) && value.idGalleryType === type) {
                            deleteList.push(value);
                        }
                    });
                });

                $.each(deleteList, function (key, value) {
                    var index = entityList.indexOf(value);
                    entityList.splice(index, 1);
                });

                for (var i = 0; i < entityList.length; i++) {
                    entityList[i].orderNumber = i;
                }

                entityList.sort(function (a, b) {
                    return a.orderNumber - b.orderNumber;
                });

                $scope.$apply();
            });
        } else {
            messagesSpin.showMessage("Please select an item from list", "error");
        }

    }

    /*group toogle*/
    $scope.groupToggle = function () {
        $('#groups').toggleClass("is-visible");
        $(".group-hide-button").toggle()
    };

    $scope.goToScroll = function (id) {

        id = id.replace("link", "");
        var windowHeight = $(window).height();
        var heigthLayoutMove = ($('.mdl-layout__content').height() - windowHeight + 350) * -1;
        $('.mdl-layout__content').scrollTo($("#" + id), 800, { offset: { top: heigthLayoutMove, left: 0 } });
        $("#menuGroup" + id).addClass("item-group-detail-select");

    };

    $scope.goToScrollStep = function (idContainer, itemClass, direction) {
        var itemWidth = $("." + itemClass).outerWidth(true);
        var currentScroll = $("#" + idContainer).scrollLeft();

        if (direction == 'left') {
            $('#' + idContainer).animate({ scrollLeft: currentScroll - itemWidth }, 500);
        }
        else {
            $('#' + idContainer).animate({ scrollLeft: currentScroll + itemWidth }, 500);
        }

    };


    /*ExtendMethod*/
    if (typeof ExtendAdminDetail === "function") {
        ExtendAdminDetail($scope, $http, $filter, $location, $interval);
    }
});
