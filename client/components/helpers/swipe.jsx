swipe = {
  on: function(el,opts) {
    var xDown = null;
    var yDown = null;
    var left = opts.left || function(){};
    var right = opts.right || function(){};
    var up = opts.up || function(){};
    var down = opts.down || function(){};

    function handleTouchStart(e) {
      xDown = e.touches[0].clientX;
      yDown = e.touches[0].clientY;
    };

    function handleTouchMove(e) {
      if ( !xDown || !yDown ) {
        return;
      }x

      var xUp = e.touches[0].clientX;
      var yUp = e.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff) ) {
        if ( xDiff > 0 ) {
          left();
        } else {
          right();
        }
      } else {
        if ( yDiff > 0 ) {
          up();
        } else { 
          down();
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    };

    el.addEventListener('touchstart', handleTouchStart, false);
    el.addEventListener('touchmove', handleTouchMove, false);
  },
  off: function(el) {
    el.removeEventListener('touchstart');
    el.removeEventListener('touchmove');
  }
};