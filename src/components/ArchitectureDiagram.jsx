import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing, duration, stagger } from '../animations/presets';

gsap.registerPlugin(ScrollTrigger);

function ArchitectureDiagram() {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const node = rootRef.current;
        if (!node) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: node,
                    start: 'top 85%',
                    once: true,
                },
            });

            tl.fromTo(node,
                { opacity: 0 },
                { opacity: 1, duration: duration.fast, ease: easing.entry }
            );

            if (prefersReducedMotion) return;

            const cols = node.querySelectorAll('.arch-col');
            const arrows = node.querySelectorAll('.arch-arrow');
            const stats = node.querySelectorAll('.arch-stat');
            const storage = node.querySelector('.arch-storage-branch');

            tl.fromTo(cols,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: duration.entry, ease: easing.entry, stagger: stagger.normal },
                '-=0.1'
            )
            .fromTo(arrows,
                { opacity: 0, scaleX: 0 },
                { opacity: 1, scaleX: 1, duration: duration.entry, ease: easing.entry, stagger: stagger.normal, transformOrigin: 'left center' },
                '-=0.4'
            );

            if (storage) {
                tl.fromTo(storage,
                    { opacity: 0, x: -10 },
                    { opacity: 1, x: 0, duration: duration.fast, ease: easing.entry },
                    '-=0.2'
                );
            }

            tl.fromTo(stats,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: duration.fast, ease: easing.entry, stagger: stagger.fast },
                '-=0.3'
            );
        }, node);

        return () => ctx.revert();
    }, []);

    return (
        <div className="arch-diagram" ref={rootRef} style={{ opacity: 0 }}>
            <div className="arch-header">
                <span className="arch-label">architecture.flow</span>
                <span className="arch-status">
                    <span className="arch-status-dot"></span>LIVE
                </span>
            </div>

            <div className="arch-columns">
                <div className="arch-col">
                    <span className="arch-col-title">FRONTEND</span>
                    <div className="arch-col-body">
                        <span className="arch-item">React</span>
                        <span className="arch-item">WaveSurfer.js</span>
                        <span className="arch-item">Web Audio API</span>
                    </div>
                </div>

                <div className="arch-arrow">
                    <span className="arch-arrow-line">HTTPS / WS</span>
                    <span className="arch-arrow-symbol">──────&gt;</span>
                </div>

                <div className="arch-col arch-col-center">
                    <span className="arch-col-title">BACKEND</span>
                    <div className="arch-col-body">
                        <span className="arch-item-highlight">Fastify</span>
                        <span className="arch-item-sub">Flat Plugins</span>
                        <span className="arch-item-sub">JWT / Argon2id</span>
                        <span className="arch-item-sub">Storage</span>
                    </div>
                </div>

                <div className="arch-arrow">
                    <span className="arch-arrow-line">SQL / ORM</span>
                    <span className="arch-arrow-symbol">──────&gt;</span>
                </div>

                <div className="arch-col">
                    <span className="arch-col-title">DATABASE</span>
                    <div className="arch-col-body">
                        <span className="arch-item-highlight">PostgreSQL</span>
                        <span className="arch-item-sub">14 Models</span>
                        <span className="arch-item-sub">15 Migrations</span>
                    </div>
                </div>
            </div>

            <div className="arch-storage-branch">
                <span className="arch-storage-arrow">│</span>
                <span className="arch-storage-arrow">└───&gt;</span>
                <span className="arch-storage-label">Supabase Storage</span>
            </div>

            <div className="arch-footer">
                <div className="arch-stat">
                    <span className="arch-stat-num">40+</span>
                    <span className="arch-stat-label">ENDPOINTS</span>
                </div>
                <div className="arch-stat">
                    <span className="arch-stat-num">14</span>
                    <span className="arch-stat-label">MODELS</span>
                </div>
                <div className="arch-stat">
                    <span className="arch-stat-num">15</span>
                    <span className="arch-stat-label">MIGRATIONS</span>
                </div>
                <div className="arch-stat">
                    <span className="arch-stat-num">18</span>
                    <span className="arch-stat-label">TESTS</span>
                </div>
            </div>
        </div>
    );
}

export { ArchitectureDiagram };
