(function () {
  function initCarrusel(carrusel) {
    var imgs = Array.prototype.slice.call(carrusel.querySelectorAll('img, video'));
    if (imgs.length === 0) return;

    var track = document.createElement('div');
    track.className = 'carrusel-track';

    imgs.forEach(function (img) {
      var slide = document.createElement('div');
      slide.className = 'carrusel-slide';
      img.parentNode.insertBefore(slide, img);
      slide.appendChild(img);
      track.appendChild(slide);
    });

    carrusel.innerHTML = '';
    carrusel.appendChild(track);
    carrusel.dataset.count = imgs.length;

    var current = 0;
    var dots = [];

    function goTo(index) {
      current = (index + imgs.length) % imgs.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    }

    if (imgs.length > 1) {
      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'carrusel-btn carrusel-prev';
      prevBtn.setAttribute('aria-label', 'Previous image');
      prevBtn.textContent = '‹';
      prevBtn.addEventListener('click', function () { goTo(current - 1); });

      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'carrusel-btn carrusel-next';
      nextBtn.setAttribute('aria-label', 'Next image');
      nextBtn.textContent = '›';
      nextBtn.addEventListener('click', function () { goTo(current + 1); });

      var dotsWrap = document.createElement('div');
      dotsWrap.className = 'carrusel-dots';
      imgs.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carrusel-dot';
        dot.setAttribute('aria-label', 'Go to image ' + (i + 1) + ' of ' + imgs.length);
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });

      carrusel.appendChild(prevBtn);
      carrusel.appendChild(nextBtn);
      carrusel.appendChild(dotsWrap);

      var touchStartX = null;
      carrusel.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      carrusel.addEventListener('touchend', function (e) {
        if (touchStartX === null) return;
        var delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) {
          goTo(current + (delta < 0 ? 1 : -1));
        }
        touchStartX = null;
      });
    }

    goTo(0);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.carrusel').forEach(initCarrusel);
  });
})();
