const lenis = new Lenis();

lenis.on('scroll', e => {
    console.log(e);
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const ani2 = gsap.timeline();
ani2.to('.portfolio__desc', { scale: 0.1, duration: 1 });
ScrollTrigger.create({
    animation: ani2,
    trigger: '.portfolio__desc .t2',
    start: 'top top',
    end: '+=2000',
    scrub: true,
    pin: true,
    anticipatePin: 1,
    markers: true,
});
