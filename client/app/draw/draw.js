
// draw.js
angular.module('okdoodle.draw', [])
.controller('DrawController', function () {

  //THIS IS REPLACEABLE.
  // need an Alias for the canvas element, and unfortunately
  //might need to use angular's jqlite in lieu of true two-way data binding.
  // other options: maybe store each
  //this.currentCanvas = angular.element(??)

  // use scope.$watch for changes in any options (e.g. color, width);
  //
})


.factory('DrawingService', function(){
  //TODO: this should contain drawing-specific elements that aren't used anywhere else.
  // should have a variable that points to the selected drawing in "UserProperties".

  // The object containing x/y coordinates shouldn't be stored here. that should be stored in userService
  // (or elsewhere, or) in app.js or profile.js. Why? that object needs to be referenced both in the "draw" view and in the
  // "profile" view (as a smaller thumbnail).
  // We should also call methods from a dedicated factory for routing here: making POST requests on saves, for instance.
})


// methods to look into addEventListener


.directive('canvasDraw', ['$document', function($document) {
  // function that takes care of drawing on canvas
  function doodle(scope, element, attrs) {
    // variables for the canvas
    var pixSize = 8;
    // keep track of x and y
    var prevX;
    var prevY;
    var currX;
    var currY;

    // console.log(element);
    var context = element[0].getContext('2d');
    // true when mouse is down
    var isDraw = false;

    element.on('mousedown', function(e) {
      prevX = e.offsetX;
      prevY = e.offsetY;
      // beginPath canvas method that allows us to draw based on a specific position.
      context.beginPath();
      // start drawing
      isDraw = true;
      // $document.on('mousemove', mousemove);
      // $document.on('mouseup', mouseup);
    });
    element.on('mousemove', function(e) {
      // only begin drawing if mouse is down.
      if(isDraw) {
        currX = e.offsetX;
        currY = e.offsetY;
        // draw method
        draw(prevX, prevY, currX, currY);
        prevX = currX;
        prevY = currY;
      }
    });
    // stops drawing on event.
    element.on('mouseup', function(e) {
      isDraw = false;
      // $document.off('mousemove', mousemove);
      // $document.off('mouseup', mouseup);
    });
    // canvas methods that draw from point to point
    function draw(prevX, prevY, currX, currY) {
      context.moveTo(prevX, prevY);
      context.lineTo(currX, currY);
      // context.lineWidth = 10;
      context.stroke();
      // $scope.apply();
      // context.stroke(parseInt(prevX)*pixSize, parseInt(prevY)*pixSize, pixSize, pixSize);

    }
  }
  return {
    // this means the directive is restricted to Attributes with the name canvasDraw
    // restrict: "A",
    // Allows us to manipulate the DOM directly
    link: doodle
  };
}]);
// .directive('myDraggable', ['$document', function($document) {
//   console.log('hey');
//   return {
//     link: function(scope, element, attr) {
//       }
//   };
// }]);
