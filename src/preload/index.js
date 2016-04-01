(function () {

  var d = document;
  var ce = 'createElement';
  var ga = 'getAttribute';

  function isCanvasSupported () {
    var elem = d[ce]('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }
  function preload (image) {
    var originalSrc, previewImage, preloadImage, w, h, size;

    if (!isCanvasSupported()) {
      image.src = originalSrc;
      return;
    }

    originalSrc = image[ga]('data-coloor');
    size = image[ga]('data-coloor-size').split('x');
    w = parseInt(size[0]);
    h = parseInt(size[1]);
    previewImage = new Image();
    preloadImage = new Image();

    previewImage.onload = function () {
      var canvas = d[ce]('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(previewImage, 0, 0, w, h);
      image.src = canvas.toDataURL("image/png");
    }
    previewImage.src = image[ga]('src');

    preloadImage.onload = function () {
      image.src = originalSrc;
    }
    preloadImage.src = originalSrc;
  }

  var images = d.querySelectorAll('img[data-coloor]');
  for(var i=0; i<images.length; i++) {
    preload(images[i]);
  }

})();