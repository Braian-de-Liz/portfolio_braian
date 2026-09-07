function ArchitectureDiagram() {
    return (
        <div className="arch-diagram">
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
