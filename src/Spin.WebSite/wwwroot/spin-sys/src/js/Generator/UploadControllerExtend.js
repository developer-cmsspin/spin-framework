(function () {
    var moduleName = 'spin.uploadFile';
    /*object base upload file*/
    function uploadFileInformation(nameContent, attrs, result) {
        var module = $('#module').val();
        var controller = $('#controller').val();
        var segment = $('#segment').val();
        if (!result) {
            result = {
                /*property*/
                content: "",
                uploadInputName: "",
                uploadButtonUpload: "",
                uploadButtonDelete: "",
                url: "",
                messageProcessing: "",
                messageLoading: "",
                filesAccept: "",
                typeUpload: "",
                nameVariable: "",
                random: false,
                multipleFile: false,
                fileName: '',
                initObject: null,
                files: []
            };
        }

        /* Validate inforamtion */
        result.content = nameContent;

        if (attrs.spinAccept)
            result.filesAccept = attrs.spinAccept;

        if (attrs.spinTypeload)
            result.typeUpload = attrs.spinTypeload;

        if (attrs.outData)
            result.nameVariable = attrs.outData;

        if (attrs.spinRandomname)
            result.random = JSON.parse(attrs.spinRandomname);

        if (attrs.spinMultiplefile)
            result.multipleFile = JSON.parse(attrs.spinMultiplefile);

        if (attrs.spinNamefile)
            result.fileName = attrs.spinNamefile;

        result.uploadInputName = result.content.replace(/content/g, 'input');
        result.uploadButtonUpload = result.content.replace(/content/g, 'upload');
        result.uploadButtonDelete = result.content.replace(/content/g, 'delete');

        /*Add parameter by async*/
        if (attrs.spinUrl)
            result.url = attrs.spinUrl;

        if (attrs.spinMessageProcesing) {
            result.messageProcessing = attrs.spinMessageProcesing;
        } else if (!result.messageProcessing) {
            result.messageProcessing = 'Processing file....';
        }

        if (attrs.spinMessageLoading) {
            result.messageLoading = attrs.spinMessageLoading;
        } else if (!result.messageLoading) {
            result.messageLoading = 'Uploading....';
        }

        /*Init Object*/
        if (attrs.spinInitObject) {
            result.initObject = JSON.parse(attrs.spinInitObject.replace(/'/g, "\""));
            result.initObject.index = 0;
            result.initObject.loading = false;
        }

        if(!result.initObject){
            result.initObject = { typeMedia: 1, path:''};
        }

        /*URL*/
        if (!result.url) {
            result.url = '/' + segment + '/' + module + '/' + controller + '/UploadFile';
        }


        return result;
    }


    angular.module(moduleName, [])
        .directive('spinUploadFile', ['$compile', '$parse', uploadFileDirective])
        .directive('spinShowVideo', ['$interval', '$parse', showVideoDirective]);

    /*Directive Name*/
    function uploadFileDirective($compile, $parse) {

        var link = function (scope, element, attrs, ngModelCtrl) {
            /*load info*/
            var info = scope.$eval(attrs.spinUploadFile);
            info = new uploadFileInformation("#" + attrs.id, attrs, info);

            var model = $parse(attrs.ngModel);
            /*load events*/
            /*click*/
            element.find(".uploadImage").click(function () {
                var uploadControl = $(info.content).find(info.uploadInputName);
                uploadControl[0].value = "";
                uploadControl.attr("accept", info.filesAccept);
                uploadControl.trigger('click');
            });
            /*click delete*/
            scope.deleteFile = function (nameVariable) {
                eval('scope.'+ nameVariable + "=null");
                
                //model.assign(scope, null);
            };
            /*drag and drop*/
            function dragValidator(e) {
                var result = true;
                var typeFile = info.filesAccept.replace('*', '').replace('.', '');
                $.each(e.originalEvent.dataTransfer.items, function (keyDrag, valueDrag) {
                    if (valueDrag.type.indexOf(typeFile) == -1) {
                        result = false;
                        return;
                    }
                });

                return result;
            };
            element.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }).on('dragover dragenter', function (e) {
                if (dragValidator(e)) {
                    e.originalEvent.dataTransfer.dropEffect = "copy";
                    $(info.content).addClass('spin-is-dragover');
                } else {
                    e.originalEvent.dataTransfer.dropEffect = "none";
                    $(info.content).addClass('spin-is-not-dragover');
                }
            }).on('dragleave dragend drop', function (e) {
                $(info.content).removeClass('spin-is-dragover');
                $(info.content).removeClass('spin-is-not-dragover');
            }).on('drop', function (e) {
                if (dragValidator(e)) {
                    if (info.multipleFile) {
                        info.files = e.originalEvent.dataTransfer.files;
                    } else {
                        info.files = new Array();
                        info.files.push(e.originalEvent.dataTransfer.files[0]);
                    }
                    callService();
                }
            });
            /*change value input*/
            element.find(".uploadInput").change(function () {
                info.files = this.files;
                callService();
            });
            /*LoadFile*/
            function callService() {
                /*load uploading*/
                var loading = $(info.content).find(".content-image-loading");
                var image = $(info.content).find(".content-image");
                var text = $(info.content).find(".text-image-loading");

                /*load object*/
                var data = new FormData();

                /* Message Init */
                text.html(info.messageLoading);

                /*validate if use multiples files*/
                if (info.multipleFile) {
                    scope.$apply(function (scope) {
                        $.each(info.files, function (i, file) {
                            //var objectClone = JSON.parse(JSON.stringify(info.initObject));
                            //objectClone.index = model(scope).length + i;
                            //objectClone.loading = true;

                            //model(scope).push(objectClone);
                            data.append('file-' + i, file);
                        });
                    });
                } else {
                    data.append('file-0', info.files[0]);
                }

                if (info.files[0] != undefined) {
                    data.append("nameFile", info.files[0].name);
                }

                data.append("id", scope.entity.id);
                data.append("typeFile", info.typeUpload);
                data.append("random", info.random);

                if (info.typeUpload == 'VIDEO') {
                    data.append("entityId", angular.element($("#viewContent")).scope().$id);
                }

                /*loading*/
                image.hide();
                loading.show();

                $.ajax({
                    /*Load Inforamtion send server*/
                    url: info.url,
                    type: 'POST',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    /*Progress bar*/
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();

                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete = parseInt(percentComplete * 100);
                                //console.log(percentComplete);

                                text.html(percentComplete + "%");

                                if (percentComplete === 100) {
                                    text.html(info.messageProcessing);
                                }

                            }
                        }, false);

                        return xhr;
                    }
                }).done(function (data) {
                    scope.$apply(function (scope) {
                        /*validate if use multiples files or object array*/
                        var modelInfo = model(scope);
                        if (info.multipleFile || Array.isArray(modelInfo)) {
                            $.each(data, function (key, value) {
                                var objectClone = JSON.parse(JSON.stringify(info.initObject));
                                objectClone.path = value;
                                modelInfo.push(objectClone);
                            });
                        } else {
                            model.assign(scope, data[0]);
                            //eval('scope.'+ info.nameVariable + "='"+ data[0] +"'");
                        }
                    });

                    loading.hide();
                    image.show();
                }).fail(function (jqXHR, textStatus) {
                    //alert("Request failed: " + textStatus);
                    messagesSpin.hideMessage();
                    messagesSpin.showMessage("Error saving video", "error");

                    loading.hide();
                    image.show();
                });
            }
        };

        return {
            restrict: 'A',
            replace: true,
            require: 'ngModel',
            link: link
        };
    }

    function showVideoDirective($interval, $parse) {
        var link = function (scope, element, attrs, ngModelCtrl) {
            var indexItem = 0;

            /*click*/
            element.click(function () {
                $interval(function () { scope.carrusel(); }, 2000); // Change image every 2 seconds
            });

            /**/
            scope.carrusel = function () {
                var nameControl = "#" + element.attr("id");


                if (indexItem == 7) {
                    indexItem = 0;
                } else {
                    indexItem += 1;
                }

                var result = $(nameControl).find(".carrusel-item");
                $(nameControl).find(".carrusel-active").removeClass("carrusel-active");
                $(result[indexItem]).addClass("carrusel-active");


            };
        };

        return {
            restrict: 'A',
            replace: true,
            link: link
        };
    }

}());

/*TRANSLATE */
(function () {
    var moduleName = 'spin.translate';

    angular.module(moduleName, [])
        .directive('spinTranslate', ['$compile', '$parse', translateDirective]);

    function translateDirective($compile, $parse) {
        var link = function (scope, element, attrs, ngModelCtrl) {

            var model = $parse(attrs.spinTranslate);

            element.find(".btn-translate").click(function () {
                element.find(".content-language-detail").slideToggle();
                element.find(".btn-translate").toggleClass("item-open-translate");
            });

            //scope.$watch(attrs.spinTranslate, function (val,newval) {
            //},true);
        }

        return {
            restrict: 'A',
            replace: true,
            link: link
        };
    }
}());

/*Geolocation */
(function () {
    var moduleName = 'spin.geolocation';

    angular.module(moduleName, [])
        .directive('spinGeolocation', ['$compile', '$parse', geolocationDirective]);

    function geolocationDirective($compile, $parse) {
        var link = function (scope, element, attrs, ngModelCtrl) {

            var model = $parse(attrs.spinGeolocation.replace(/'/g,''));
            var nameModel = element.find("#modelName").val();
            //Show geolocation
            element.find(".open-geolocation").click(function () {
                element.find(".content-geolocation").slideToggle();
                element.find(".open-geolocation").toggleClass("item-open-translate");

                //always finaly with default value
                scope.showGeolocation(null, nameModel);
            });

            element.find(".btn-add-location-geolocation").click(function(){
                element.find('.content-list-geolocation').hide();
                element.find('.add-geolocation-control').show();
            });


            element.find(".btn-add-geolocation").click(function(){
                scope.$broadcast('angucomplete-alt:clearInput');

                if (scope.geolocationInformation != undefined) {
                    var objectGeolocation = JSON.parse(JSON.stringify(scope.geolocationInformation));
                    scope.geolocationInformation = undefined;

                    var informationModel = model(scope);

                    if (!informationModel.spinGeolocation) {
                        informationModel.spinGeolocation = [];
                    }
                    informationModel.spinGeolocation.push({ idPlace: objectGeolocation.id, idRelation: informationModel.id, place: objectGeolocation.place });
                    
                    scope.$apply(function()
                    {
                        model.assign(scope,informationModel); 
                    });
                }

                element.find('.add-geolocation-control').hide();
                element.find('.content-list-geolocation').show();
            });

            element.find('.remove-geolocation').click(function(){
                var indexData = objectBase.spinGeolocation.indexOf(itemGeolocation);
                objectBase.spinGeolocation.splice(indexData, 1);
            });


            //using function scope because need itemGeolocation
            scope.showGeolocation = function (itemGeolocation, nameModel) {
                var codePlace = (itemGeolocation != null && itemGeolocation.place != null) ? itemGeolocation.place.code : "";
                var ContentData = $('#content' + nameModel);

                ContentData.find('.item-geolocation').hide();

                //change color
                ContentData.find(".select-geolocation").removeClass("select-geolocation");
                if (codePlace == '') {
                    ContentData.find(".item-default").addClass("select-geolocation");
                    ContentData.find('.base-geolocation' + codePlace).show();
                } else {
                    ContentData.find('.item-geolocation-' + codePlace).show();
                    ContentData.find(".item-" + codePlace).addClass("select-geolocation");
                }
            }

           
            scope.addGeolocation = function (selectAutocomplete, row) {
                if (selectAutocomplete != undefined) {
                    scope.geolocationInformation = selectAutocomplete.originalObject;
                }
            }

            scope.removeGeolocation = function (objectBase, itemGeolocation, nameModel) {
                var indexData = objectBase.spinGeolocation.indexOf(itemGeolocation);
                objectBase.spinGeolocation.splice(indexData, 1);

            }

        }

        return {
            restrict: 'A',
            replace: true,
            link: link
        };
    }
}());

/*Validator */
(function () {
    var moduleName = 'spin.validator';

    angular.module(moduleName, [])
        .directive('spinValidator', ['$compile', '$parse', validatorDirective]);

    function validatorDirective($compile, $parse) {
        var link = function (scope, element, attrs, ngModelCtrl) {

            var model = $parse(attrs.ngModel);

            scope.$watch(model, function (valueInput) {

                //elm[0].setCustomValidity(errorMsg);
                //ctl.$setValidity('wjValidationError', errorMsg ? false : true);
            });
        }

        return {
            restrict: 'A',
            replace: true,
            link: link,
            require: 'ngModel'
        };
    }
}());



/*Based to: "https://codepen.io/aorian/pen/bNVVpr" */
angular.module("sticky", []).directive("sticky", function ($window) {
    return {
        link: function (scope, element, attrs) {

            var $win = angular.element("main");
            var headerHeight = $('header').height();

            if (scope._stickyElements === undefined) {
                scope._stickyElements = [];

                $win.bind("scroll.sticky", function (e) {
                    var pos = $win.scrollTop();
                    for (var i = 0; i < scope._stickyElements.length; i++) {

                        var item = scope._stickyElements[i];

                        if (!item.isStuck && pos + headerHeight > item.start) {
                            item.element.addClass("stuck");
                            item.isStuck = true;

                            if (item.placeholder) {
                                item.placeholder = angular.element("<div></div>")
                                    .css({ height: item.element.outerHeight() + "px" })
                                    .insertBefore(item.element);
                            }
                        }
                        else if (item.isStuck && pos < item.start-headerHeight-item.element.outerHeight()) {
                            item.element.removeClass("stuck");
                            item.isStuck = false;

                            if (item.placeholder) {
                                item.placeholder.remove();
                                item.placeholder = true;
                            }
                        }
                    }
                });

                var recheckPositions = function () {
                    for (var i = 0; i < scope._stickyElements.length; i++) {
                        var item = scope._stickyElements[i];
                        if (!item.isStuck) {
                            item.start = item.element.offset().top;
                        } else if (item.placeholder) {
                            item.start = item.placeholder.offset().top;
                        }
                    }
                };
                $win.bind("load", recheckPositions);
                $win.bind("resize", recheckPositions);
            }

            var item = {
                element: element,
                isStuck: false,
                placeholder: attrs.usePlaceholder !== undefined,
                start: element.offset().top
            };

            scope._stickyElements.push(item);

        }
    };
});