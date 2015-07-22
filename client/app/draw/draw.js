
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
  //TODO: consider moving pix variable elsewhere, DEFINITELY move storePic elsewhere
  var pixelSize = 8;
  // this is a temporary storage location to practice
  // storing rect coords. It is absolutely dispensable.
  var storePic = {};
  // function that takes care of drawing on canvas
  
  function doodle(scope, element, attrs) {
    // console.log(element);
    var context = element[0].getContext('2d');
    // true when mouse is down
    var isDraw = false;
    // keep track of x and y
    var prevX;
    var prevY;
    var currX;
    var currY;
    function drawSequence(e) {
      if(isDraw) {
        currX = e.offsetX;
        currY = e.offsetY;
        // draw method
        // we can't have people drawing rectangles any old place on the 
        // canvas: the x and y coordinates need to be rounded to the nearest
        // bit corner
        xBitStart = Math.floor(currX/pixelSize) * pixelSize;
        yBitStart = Math.floor(currY/pixelSize) * pixelSize;
        draw(prevX, prevY, xBitStart, yBitStart);
        prevX = currX;
        prevY = currY;
      }
    }
    element.on('mousedown', function(e) {
      //The old logic is commented out: too space-intensive
      // to integrate path drawings into a simple bitmap.
      // It should NOT be deleted, because it could lead to another
      // feature/implementation down the road
      prevX = e.offsetX;
      prevY = e.offsetY;
      // beginPath canvas method that allows us to draw based on a specific position.
      //context.beginPath();

      // start drawing
      isDraw = true;
      drawSequence(e);
      // $document.on('mousemove', mousemove);
      // $document.on('mouseup', mouseup);
    });
    element.on('mousemove', function(e) {
      // only begin drawing if mouse is down.
      drawSequence(e);
    });
    // stops drawing on event.
    element.on('mouseup', function(e) {
      isDraw = false;
      // $document.off('mousemove', mousemove);
      // $document.off('mouseup', mouseup);
    });
    // canvas methods that draw from point to point
    function draw(prevX, prevY, currX, currY) {
      // this "moveTo, lineTo, stroke" logic is for drawing more intricate drawings, perhaps down
      // the line:
      // context.moveTo(prevX, prevY);
      // context.lineTo(currX, currY);
      // context.stroke();
      //TODO: refactor "fillStyle" to take variable color instead of absolute color
      context.fillStyle = "#000";
      // this starts a rectangle at the current X and Y, with a size of "pixelSize"
      context.fillRect(currX, currY, pixelSize, pixelSize);
      // $scope.apply(); <-- except this line I dunno what it does

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
