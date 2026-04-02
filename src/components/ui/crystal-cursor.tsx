import React, { useEffect, useRef } from "react";

interface CrystalCursorProps {
    title?: string;
    subtitle?: string;
    caption?: string;
    crystalColor?: string;
    shatterColor?: string;
    titleSize?: string;
    subtitleSize?: string;
    captionSize?: string;
    className?: string;
    imageUrl?: string;
}

const CrystalCursor: React.FC<CrystalCursorProps> = ({
    title = "Y N K",
    subtitle = "Sistemas Intelingentes",
    caption = "Clique para estilhaçar a luz",
    crystalColor = "hsla(0, 0%, 15%, 0.15)", // Tons cinza/grafite escuros translucidos
    shatterColor = "hsla(0, 0%, 10%, 0.9)", // Preto/Grafite
    titleSize = "text-5xl md:text-7xl lg:text-8xl",
    subtitleSize = "text-xl md:text-2xl",
    captionSize = "text-sm md:text-base",
    className = "",
    imageUrl = "/logo-ynk.jpg",
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const crystals = useRef<any[]>([]);
    const shards = useRef<any[]>([]);

    // O uso de classes nativas dentro do componente ajuda a encapsular a lógica do Canvas
    class Crystal {
        x: number;
        y: number;
        angle: number;
        radius: number;
        targetRadius: number;
        life: number;
        context: CanvasRenderingContext2D;
        lineWidth: number;
        turnAngle: number;

        constructor(x: number, y: number, context: CanvasRenderingContext2D) {
            this.x = x;
            this.y = y;
            this.angle = Math.random() * Math.PI * 2;
            this.radius = 0;
            this.targetRadius = Math.random() * 80 + 20;
            this.life = 150;
            this.context = context;
            this.lineWidth = Math.random() * 1.5 + 0.5;
            this.turnAngle = (Math.random() - 0.5) * 0.1;
        }

        draw() {
            // Usa a cor base do cristal controlando alpha pela vida útil
            this.context.strokeStyle = crystalColor.replace(
                /%?,?\s*[0-9.]+\)/,
                `, ${this.life / 150})`
            );
            this.context.lineWidth = this.lineWidth;
            this.context.beginPath();
            this.context.moveTo(this.x, this.y);
            const endX = this.x + Math.cos(this.angle) * this.radius;
            const endY = this.y + Math.sin(this.angle) * this.radius;
            this.context.lineTo(endX, endY);
            this.context.stroke();
        }

        update() {
            if (this.radius < this.targetRadius) {
                this.radius += 0.5;
            }
            this.life -= 1;
            this.angle += this.turnAngle;
        }
    }

    class Shard {
        x: number;
        y: number;
        angle: number;
        vx: number;
        vy: number;
        life: number;
        size: number;
        context: CanvasRenderingContext2D;

        constructor(x: number, y: number, context: CanvasRenderingContext2D) {
            this.x = x;
            this.y = y;
            this.angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.vx = Math.cos(this.angle) * speed;
            this.vy = Math.sin(this.angle) * speed;
            this.life = 100;
            this.size = Math.random() * 3 + 1;
            this.context = context;
        }

        draw() {
            // Opacidade caindo com a vida
            this.context.fillStyle = shatterColor.replace(
                /%?,?\s*[0-9.]+\)/,
                `, ${this.life / 100})`
            );
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.context.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 1;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const animate = () => {
            // Fundo leve para desbotar as linhas passadas – tons prateados / off-white claro
            ctx.fillStyle = "rgba(235, 235, 235, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (Math.random() > 0.7) {
                crystals.current.push(
                    new Crystal(
                        mouse.current.x + (Math.random() - 0.5) * 50,
                        mouse.current.y + (Math.random() - 0.5) * 50,
                        ctx
                    )
                );
            }

            crystals.current = crystals.current.filter((c) => c.life > 0);
            crystals.current.forEach((c) => {
                c.update();
                c.draw();
            });

            shards.current = shards.current.filter((s) => s.life > 0);
            shards.current.forEach((s) => {
                s.update();
                s.draw();
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const handleClick = (e: MouseEvent) => {
            for (let i = 0; i < 50; i++) {
                shards.current.push(new Shard(e.clientX, e.clientY, ctx));
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);
        window.addEventListener("click", handleClick);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("click", handleClick);
        };
    }, [crystalColor, shatterColor]);

    return (
        // Fundo fixo cor prata para combinar perfeitamente com a imagem passada (código da cor esbranquiçada)
        <div className={`relative h-screen w-screen overflow-hidden bg-[#e8e8e8] font-sans ${className}`}>

            {/* Imagem background/ambiente por baixo do Canvas e da Interface */}
            {imageUrl && (
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-multiply pointer-events-none">
                    <img
                        src={imageUrl}
                        alt="YNK Base"
                        className="w-full h-full object-cover filter blur-3xl opacity-50 scale-110"
                    />
                </div>
            )}

            <canvas ref={canvasRef} className="fixed inset-0 block h-full w-full z-10 mix-blend-multiply" />

            <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-4 select-none text-center p-4 pointer-events-none">

                {/* Renderiza o Logo Exato enviado interagindo visualmente */}
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Logo YNK"
                        className="w-48 h-48 md:w-64 md:h-64 object-contain mix-blend-darken shadow-2xl rounded-3xl"
                        style={{
                            boxShadow: "0 20px 50px rgba(0,0,0,0.1), 0 0 20px rgba(0,0,0,0.05)"
                        }}
                    />
                )}

                {/* Textos Secundários Complementares usando tom carvão escuro para combinar com o Logo 3D em Prata/Preto */}
                <h2
                    className={`m-0 p-0 text-[#1a1a1a] font-normal tracking-wide leading-none ${subtitleSize}`}
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                >
                    {subtitle}
                </h2>

                <p className={`mt-2 p-0 text-[#4d4d4d] font-light tracking-widest uppercase ${captionSize}`}>
                    {caption}
                </p>
            </div>
        </div>
    );
};

export default CrystalCursor;
