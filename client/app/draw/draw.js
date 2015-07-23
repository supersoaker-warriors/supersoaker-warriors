// draw.js
angular.module('okdoodle.draw', [])
.controller('DrawController', function ($http) {
  this.settings = {"color": "000"};
  this.colors = {"Red": "F00", 
                 "Orange": "F60",
                 "Yellow": "FF0",
                 "Green": "0F0",
                 "Blue": "00F",
                 "Pink": "F0F",
                 "Purple": "90F",
                 "Black": "000"};
  this.storePic = {};
  this.changes = {};
  this.deletions = {};
  this.setColor = function(color) {
    this.settings.color = color;
  };
  this.deletions = {"all": false};
  this.save = function(){
    console.log("saving...");
    //call factory method, sending changes to factory
    //I'll be able to send: changes, deletions
    //I'll need you to get: username
  }
  this.blue = function(){
    this.settings.color = "00F";
  }
  this.eraser = function(){
    this.settings.color = "FFF";
  }
  this.clear = function(){
    this.deletions["all"] = true;
    this.changes = {};
  }

  // $http.get('/api/')
  // .success(function(data) {
  //   this.storePic = JSON.parse(data);
  // })
  // .error(function() {
  //   console.log('error with get request for draw');
  // });
  //THIS IS REPLACEABLE.
  // need an Alias for the canvas element, and unfortunately
  //might need to use angular's jqlite in lieu of true two-way data binding.
  // other options: maybe store each
  //this.currentCanvas = angular.element(??)
  // use scope.$watch for changes in any options (e.g. color, width);
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
  // this is a temporary storage location to practice
  // storing rect coords. It is absolutely dispensable.

  // function that takes care of drawing on canvas
  function doodle(scope, element, attrs) {
    var color = scope.draw.settings;
    var pixelSize = 16;
    var storePic = {};

    // console.log(element);
    var context = element[0].getContext('2d');
    // true when mouse is down
    var isDraw = false;
    // keep track of x and y
    var prevX;
    var prevY;
    var currX;
    var currY;
    var xBitStart;
    var yBitStart;
    //note: this might be an ugly way to do this,
    // and this WILL cause problems in the great "scope draw" transition
    var changes = scope.draw.changes;
    var deletions = scope.draw.deletions;
    //this function stores coordinates in the temp object. the temp object should be moved at some point,
    // but it still makes sense to update a drawing in local memory before sending it off to firebase
    // so we can implement saves and undos
    function update(xCoord, yCoord, color) {
      var key = "[" + xCoord + "," + yCoord + "]";
      var existing;
      console.log("color: ",color)
      if(color === "FFF"){
        if(deletions[key]){
          return;
        }
        deletions[key]=true;
        if(changes[key]){
          delete changes[key];
        }
        return;
      }
      if(changes[key]===color){
        return;
      }
      if(deletions[key]){
        delete deletions[key];
        delete deletions[all];
      }
      changes[key] = color;
      storePic[key] = color;
      console.log("changes: ", scope.draw.changes);
      console.log("deletions: ", scope.draw.deletions);
    }
    function drawSequence(e) {
      if(isDraw) {
        currX = e.offsetX;
        currY = e.offsetY;
        // draw method
        // we can't have people drawing rectangles any old place on the
        // canvas: the x and y coordinates need to be rounded to the nearest
        // bit corner.
        // the X and Y coordinates that we're gonna store:
        xCoord = Math.floor(currX/pixelSize);
        yCoord = Math.floor(currY/pixelSize);
        xBitStart = xCoord * pixelSize;
        yBitStart = yCoord * pixelSize;
        if(!((xCoord === prevX) && (yCoord === prevY))){
          draw(xBitStart, yBitStart, color.color);
          //third argument should be color variable (hardcoded for now)
          update(xCoord, yCoord, color.color);
        }
        prevX = xCoord;
        prevY = yCoord;
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
      // TODO: find out why mouse up doesn't register off canvas
      drawSequence(e);
    });
    // stops drawing on event.
    element.on('mouseup', function(e) {
      isDraw = false;
      prevX = null;
      prevY = null;
      // $document.off('mousemove', mousemove);
      // $document.off('mouseup', mouseup);
    });
    // canvas methods that draw from point to point
    function draw(xBitStart, yBitStart, shade) {
      // this "moveTo, lineTo, stroke" logic is for drawing more intricate drawings, perhaps down
      // the line:
      // context.moveTo(prevX, prevY);
      // context.lineTo(currX, currY);
      // context.stroke();
      //TODO: refactor "fillStyle" to take variable color instead of absolute color
      context.fillStyle = "#" + shade;
      // this starts a rectangle at the current X and Y, with a size of "pixelSize"
      context.fillRect(xBitStart, yBitStart, pixelSize, pixelSize);
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
