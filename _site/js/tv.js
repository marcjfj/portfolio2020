console.log('loaded');

const handleMousemove = e => {
  const scale = (num, in_min, in_max, out_min, out_max) =>
    ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  function offset(el) {
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  const tvs = document.querySelectorAll('.tv');
  tvs.forEach(tv => {
    const tvOffset = offset(tv);
    const x = e.x - tvOffset.left;
    const y = e.y - tvOffset.top;
    // console.log(`mouse position: ${x}:${y}`);
    const thumbs = document.querySelectorAll('.article-thumbs .card');
    let nx;
    let ny;
    if (thumbs.length > 0) {
      nx = scale(x, -1500, 100, -30, 0) * 4.5;
      ny = -scale(y, -2500, 500, -10, 30) * 4.5;
    } else {
      nx = scale(x, -1500, 100, -30, 0) * 4.5;
      ny = -scale(y, -2000, 2000, -10, 30) * 4.5;
    }
    gsap.to(tv, { transformOrigin: '50% 50%', rotationY: nx, duration: 1 });
    gsap.to(tv, { transformOrigin: '50% 50%', rotationX: ny, duration: 1 });

    tv.addEventListener('mouseenter', () => {
      gsap.fromTo(tv, { scale: 1 }, { scale: 1.2, duration: 1 });
    });
    tv.addEventListener('mouseleave', () => {
      gsap.fromTo(tv, { scale: 1.2 }, { scale: 1, duration: 1 });
    });
  });
};

document.addEventListener('mousemove', handleMousemove);
