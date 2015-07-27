// profile.js
angular.module('okdoodle.profile', ['ui.router'])

.controller('ProfileController', function ($rootScope, DrawingService, UserService) {
  // Your code here
  // this property is more or less meaningless, for testing purposes
  this.welcome = 'okdoodle';
  this.selected = DrawingService.selected;
  this.changeSelect = function(clickedPhoto){
    DrawingService.changeSelected(clickedPhoto);
    console.log("changed! with ", clickedPhoto);
    this.selected = clickedPhoto;
    $rootScope.$broadcast('changedProf', clickedPhoto);
  }
  this.user = UserService.userObj;
})
.directive('canvasMini', ['$document', function($document) {
  // function that takes care of drawing on canvas
  function miniRender(scope, element, attrs) {
    var pixelSize = 4;
    var context = element[0].getContext('2d');
    var xBitStart;
    var yBitStart;
    //THIS SCOPE IS NOT MODULAR.
    var doodle = scope.profile.user.doodles[0];
    render();

    function render(){
      console.log("minirender called", scope);
      for(var thing in doodle){
        var newThang = thing.split(",");
        var newX = newThang[0].slice(1);
        var newY = newThang[1].slice(0, newThang[1].length-1);
        newX = parseInt(newX);
        newY = parseInt(newY);
        draw(newX, newY, doodle[thing]);
      }
    }
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
    link: miniRender
  };
}]);

