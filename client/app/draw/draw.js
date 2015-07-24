// draw.js
angular.module('okdoodle.draw', [])
.controller('DrawController', function ($http, UserService) {
  this.settings = {"color": "000"};
  this.colors = {"Red": "F00",
                 "Orange": "F60",
                 "Yellow": "FF0",
                 "Green": "0F0",
                 "Blue": "00F",
                 "Pink": "F0F",
                 "Purple": "90F",
                 "Black": "000",
                 "White": "FFF"};
  this.storePic = {};
  this.changes = {};
  this.deletions = {};
  this.truth = true;
  this.setColor = function(color) {
    this.settings.color = color;
  };
  this.deletions = {"all": false};
  this.save = function(){
    console.log("saving...");
    UserService.postChange({changes: this.changes,
                            deletions: this.deletions});
  };
  this.clear = function(){
    this.deletions= {"all": true};
    this.changes = {};
    this.truth = false;
  };
  this.render = function(){
    this.truth = true;
  }
})
.factory('DrawingService', function(){
  var colors = {"Red": "F00",
                 "Orange": "F60",
                 "Yellow": "FF0",
                 "Green": "0F0",
                 "Blue": "00F",
                 "Pink": "F0F",
                 "Purple": "90F",
                 "Black": "000",
                 "White": "FFF"}
})
// methods to look into addEventListener
.directive('canvasDraw', ['$document', function($document) {
  // function that takes care of drawing on canvas
  function doodle(scope, element, attrs) {
    var drawDown = 'mousedown';
    var drawMove = 'mousemove';
    var drawUp = 'mouseup';
    if ('ontouchstart' in window) {
      drawDown = 'touchstart';
      drawMove = 'touchmove';
      drawUp = 'touchend';
    }
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
    function render(){

    }
    function update(xCoord, yCoord, color) {
      var key = "[" + xCoord + "," + yCoord + "]";
      var existing;
      console.log("color: ",color)
      //checking if we are in "ERASE" mode
      if(color === "FFF"){
        console.log("in deletions!");
        //was there already a deletion at this point?
        if(deletions[key]){
          console.log("already deleted!");
          console.log("changes: ", scope.draw.changes);
          console.log("deletions: ", scope.draw.deletions);
          return;
        }
        //add a deletion
        deletions[key]=true;
        //was there a change that needs to be deleted?
        if(changes[key]){
          delete changes[key];
          console.log("deleted change");
          console.log("changes: ", scope.draw.changes);
          console.log("deletions: ", scope.draw.deletions);
        }
        return;
      }
      if(changes[key]===color){
        return;
      }
      if(scope.draw.deletions[key]){
        delete deletions[key];
      }
      changes[key] = color;
      deletions["all"] = false;
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
        if(!((xCoord === prevX) && (yCoord === prevY))){
          draw(xCoord, yCoord, color.color);
          //third argument should be color variable (hardcoded for now)
          update(xCoord, yCoord, color.color);
        }
        prevX = xCoord;
        prevY = yCoord;
      }
    }
    element.on(drawDown, function(e) {
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
    element.on(drawMove, function(e) {
      // only begin drawing if mouse is down.
      // TODO: find out why mouse up doesn't register off canvas
      drawSequence(e);
    });
    // stops drawing on event.
    element.on(drawUp, function(e) {
      isDraw = false;
      prevX = null;
      prevY = null;
      // $document.off('mousemove', mousemove);
      // $document.off('mouseup', mouseup);
    });
    // canvas methods that draw from point to point
    function draw(x, y, shade) {
      xBitStart = x * pixelSize;
      yBitStart = y * pixelSize;
      context.fillStyle = "#" + shade;
      // this starts a rectangle at the current X and Y, with a size of "pixelSize"
      context.fillRect(xBitStart, yBitStart, pixelSize, pixelSize);
    }
  }
  return {
    // this means the directive is restricted to Attributes with the name canvasDraw
    // restrict: "A",
    // Allows us to manipulate the DOM directly
    link: doodle
  };
}]);
