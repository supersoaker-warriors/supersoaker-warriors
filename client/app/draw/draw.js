// draw.js
angular.module('okdoodle.profile')
.controller('DrawController', function ($rootScope, $http, UserService, DrawingService) {
 // this.selected = 0;
  var that = this;
  this.currentPic = 0;
  $rootScope.$on('changedProf', function(clickedPhoto){
    that.currentPic = clickedPhoto; 
    console.log(that);
    that.clear();
    setTimeout(function(){ 
      that.render();}, 100);
  });
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
  this.changes = {};
  this.deletions = {};
  this.truth = true;
  this.setColor = function(color) {
    this.settings.color = color;
  };
  this.deletions = {"all": false};
  this.save = function(){
    var sendableObj = DrawingService.save(this.changes, this.deletions);
    UserService.postChange(sendableObj);
    console.log("this: ",this);
    console.log("that: ", that);
//    console.log(this.selected);
  }
  this.clear = function(){
    this.deletions= {"all": true};
    this.changes = {};
    this.truth = false;
    this.renderOrig = [false];
  };
  this.render = function(){
    this.truth = true;
  };
  this.renderOrig = [true];
  this.user = UserService.userObj;

})
.factory('DrawingService', function(){
  var selected = 0;
  var save = function(changes, deletions){
    //the 'or' operator is purely for test purposes
    console.log("saving...");
    var returnObj = {};
    returnObj[selected] = {changes: changes,
                           deletions: deletions};
    console.log('returning ', returnObj)
    return returnObj;
  };
  var changeSelected = function(select) {
    selected = select;
  }
  return {
    changeSelected: changeSelected,
    save: save,
    selected: selected
  };
    // UserService.postChange({changes: this.changes,
    //                         deletions: this.deletions})
})
// methods to look into addEventListener
.directive('canvasDraw', ['$document', function($document) {
  // function that takes care of drawing on canvas
  function doodle(scope, element, attrs) {
    var color = scope.draw.settings;
    var pixelSize = 16;
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
    
    var renderOrigArr = scope.draw.renderOrig;
    var changes = scope.draw.changes;
    var deletions = scope.draw.deletions;
    var doodleNum = scope.draw.currentPic;

    if(scope.draw.user.doodles && renderOrigArr[0]){
      var doodle = scope.draw.user.doodles[doodleNum];
      render();
    }

    function render(){
      for(var thing in doodle){
        var newThang = thing.split(",");
        var newX = newThang[0].slice(1);
        var newY = newThang[1].slice(0, newThang[1].length-1);
        newX = parseInt(newX);
        newY = parseInt(newY);
        draw(newX, newY, doodle[thing]);
      }
    }
    function update(xCoord, yCoord, color) {
      var key = "[" + xCoord + "," + yCoord + "]";
      var existing;
      //checking if we are in "ERASE" mode
      if(color === "FFF"){
        //was there already a deletion at this point?
        if(deletions[key]){

          return;
        }
        //add a deletion
        deletions[key]=true;
        //was there a change that needs to be deleted?
        if(changes[key]){
          delete changes[key];
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
