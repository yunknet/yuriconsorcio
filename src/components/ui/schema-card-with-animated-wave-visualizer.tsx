import React, { useEffect, useRef } from 'react';
import { Database, Activity, GitCommit, Settings, Layers, Zap } from 'lucide-react';

export default function SchemaCard() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let time = 0;
        let animationId: number;
        const waveData = Array.from({ length: 8 }).map(() => ({
            value: Math.random() * 0.5 + 0.1,
            targetValue: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 0.02 + 0.01
        }));

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function updateWaveData() {
            waveData.forEach(data => {
                if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
                const diff = data.targetValue - data.value;
                data.value += diff * data.speed;
            });
        }

        function draw() {
            if (!ctx || !canvas) return;
            ctx.fillStyle = '#0a0a0f'; // Fundo bem escuro
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            waveData.forEach((data, i) => {
                const freq = data.value * 7;
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x++) {
                    const nx = (x / canvas.width) * 2 - 1;
                    const px = nx + i * 0.04 + freq * 0.03;
                    const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
                    const y = (py + 1) * canvas.height / 2;
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                const intensity = Math.min(1, freq * 0.3);
                const r = 79 + intensity * 100;
                const g = 70 + intensity * 130;
                const b = 229;
                ctx.lineWidth = 1 + i * 0.3;
                ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
                ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
                ctx.shadowBlur = 5;
                ctx.stroke();
                ctx.shadowBlur = 0;
            });
        }

        function animate() {
            time += 0.02;
            updateWaveData();
            draw();
            animationId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-background font-sans">
            <canvas ref={canvasRef} className="fixed inset-0 block h-full w-full z-0" />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-10 pointer-events-none">
                <div className="w-full max-w-xs pointer-events-auto">
                    {/* Card Wrapper animate-float */}
                    <div className="relative overflow-hidden rounded-2xl flex flex-col animate-float backdrop-blur-md"
                        style={{
                            background: 'linear-gradient(135deg, rgba(20,20,30,0.8) 0%, rgba(10,10,15,0.8) 100%)',
                            border: '1px solid rgba(79,70,229,0.3)',
                            boxShadow: '0 0 40px rgba(79,70,229,0.2)'
                        }}>

                        <div className="p-4 flex justify-center relative">
                            <div className="w-full h-48 rounded-xl overflow-hidden relative flex items-center justify-center border border-indigo-500/30"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20,20,30,0.9) 0%, rgba(10,10,15,0.9) 100%)',
                                    boxShadow: 'inset 0 0 30px rgba(79,70,229,0.1), 0 0 20px rgba(79,70,229,0.05)'
                                }}>

                                {/* Unsplash abstract background asset */}
                                <img
                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
                                    alt="Abstract tech background"
                                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
                                />

                                {/* Animated grid background */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="w-full h-full animate-pulse" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                                </div>

                                {/* Lucide-React Icons representing connections */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    {/* Center Main Logo Icon */}
                                    <div className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/50 shadow-[0_0_30px_rgba(79,70,229,0.4)] backdrop-blur-md animate-[schemaPulse_3s_ease-in-out_infinite]">
                                        <Database className="w-8 h-8 text-indigo-400" />
                                    </div>

                                    {/* Floating Icons */}
                                    <div className="absolute top-4 left-4 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 animate-[schemaPulse_3s_ease-in-out_infinite_0.5s]">
                                        <Activity className="w-4 h-4 text-indigo-300" />
                                    </div>

                                    <div className="absolute top-8 right-6 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 animate-[schemaPulse_3s_ease-in-out_infinite_1s]">
                                        <GitCommit className="w-4 h-4 text-indigo-300" />
                                    </div>

                                    <div className="absolute bottom-6 left-6 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 animate-[schemaPulse_3s_ease-in-out_infinite_1.5s]">
                                        <Layers className="w-4 h-4 text-indigo-300" />
                                    </div>

                                    <div className="absolute bottom-4 right-4 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 animate-[schemaPulse_3s_ease-in-out_infinite_2s]">
                                        <Settings className="w-4 h-4 text-indigo-300" />
                                    </div>

                                    <div className="absolute top-[25%] right-[25%] p-1.5 rounded-full bg-indigo-400/20" style={{ animation: 'dataStream 1s linear infinite' }}>
                                        <Zap className="w-3 h-3 text-indigo-400" />
                                    </div>
                                </div>

                                {/* Subtle animated glow */}
                                <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-transparent to-transparent animate-pulse pointer-events-none" />
                            </div>
                        </div>

                        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)' }} />

                        <div className="p-4 bg-black/40 backdrop-blur-md">
                            <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-medium mb-3 border border-indigo-400/30">Database</span>
                            <h3 className="text-lg font-medium text-white mb-2">Schema Management</h3>
                            <p className="text-white/70 mb-4 leading-relaxed text-xs">
                                Design, optimize and maintain your database structure with powerful schema tools.
                            </p>
                            <div className="flex justify-between items-center">
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 transition flex items-center text-xs font-medium bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-400/30 hover:bg-indigo-500/20">
                                    Manage
                                    <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </a>
                                <span className="text-white/40 text-xs bg-white/5 px-2 py-1 rounded-full border border-white/10">Live</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
