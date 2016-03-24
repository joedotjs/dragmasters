var app = angular.module('DragMasters', []);

app.controller('GameCtrl', function ($scope) {

    $scope.getInfo = function () {
        return 'Joe';
    };

    $scope.onDrop = function (v) {
        console.log('onDrop called with', v);
    };

});

app.factory('DragFactory', function () {

    var value;

    return {
        set: function (v) {
            value = v;
        },
        get: function () {
            return value;
        }
    };

});

app.directive('dropzone', function ($parse, DragFactory) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var evaluateExpression = $parse(attrs.dropzone);

            element.on('dragover', function (e) {
                e.preventDefault();
            });

            element.on('drop', function (e) {
                if (e.stopPropagation) e.stopPropagation();
                evaluateExpression(scope, { value: DragFactory.get() });
            });

        }
    };

});

app.directive('canDrag', function ($parse, DragFactory) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var evaluateExpression = $parse(attrs.canDrag);

            element.attr('draggable', true);

            element.on('dragstart', function () {
                var value = evaluateExpression(scope);
                console.log('Setting to DragFactory:', value);
                DragFactory.set(value);
            });

        }
    };

});