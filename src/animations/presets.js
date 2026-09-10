export const easing = {
    entry: 'power3.out',
    scroll: 'power2.out',
    subtle: 'power1.out',
    linear: 'none',
};

export const duration = {
    micro: 0.2,
    fast: 0.4,
    entry: 0.6,
    hero: 0.8,
    slow: 1.0,
};

export const stagger = {
    fast: 0.04,
    normal: 0.06,
    slow: 0.08,
    cards: 0.06,
};

export const scrollConfig = {
    reveal: {
        start: 'top 85%',
        end: 'bottom 15%',
    },
    hero: {
        start: 'top top',
        end: 'bottom top',
    },
};

export const motion = {
    revealTitle: {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        ease: 'power4.out',
        duration: 0.85,
    },
    revealUp: {
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        duration: 0.6,
    },
    revealScale: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        ease: 'power3.out',
        duration: 0.65,
    },
    nodeEntry: {
        opacity: 0,
        y: 18,
        scale: 0.96,
        ease: 'power3.out',
        duration: 0.55,
    },
    connectionDraw: {
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'power2.out',
        duration: 0.45,
    },
};
