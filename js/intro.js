const head = document.querySelector('.marc-head');
const left = document.querySelector('.intro-box .left');

gsap.to(head, { y: 0, duration: 3, ease: 'bounce.out' });
const tl = gsap.timeline({ repeat: -1 });

tl.to(
  head,
  {
    rotation: -5,
    transformOrigin: '100% 100%',
    duration: 3,
    ease: 'Power3.out',
    repeat: 1,
    yoyo: true,
  },
  0
);
tl.to(
  head,
  {
    rotation: 5,
    transformOrigin: '0% 100%',
    duration: 3,
    ease: 'Power3.In',
    repeat: 1,
    yoyo: true,
  },
  6
);

left.addEventListener('mouseenter', () => {
  gsap.to(head, { y: 300, duration: 1, ease: 'Power3.out' });
});
left.addEventListener('mouseleave', () => {
  gsap.to(head, { y: 0, duration: 3, ease: 'bounce.out' });
});
const eBox = document.querySelector('.contact-box');
const email = eBox.querySelector('a');

eBox.addEventListener('mousemove', e => {
  //   console.log(e);
  const x = e.clientX;
  const y = e.clientY;
  gsap.to(email, {
    transformOrigin: '50% 50%',
    x: x - e.target.clientWidth / 2,
  });
  gsap.to(email, {
    transformOrigin: '50% 50%',
    y: y - e.target.clientHeight,
  });
});
eBox.addEventListener('mouseleave', e => {
  gsap.to(email, { x: 0 });
  gsap.to(email, { y: 0 });
});
