import React from 'react';
import CrystalCursor from "@/components/ui/crystal-cursor";
import Navbar from '@/components/landing/Navbar';

const DemoCursor = () => {
    return (
        <>
            {/* Container posicionado atrás da navbar para cobrir a tela */}
            <div className="min-h-screen bg-[#e8e8e8]">
                <Navbar />
                <CrystalCursor
                    title="Y N K"
                    subtitle="Sistemas Inteligentes"
                    caption="Clique para interagir com a luz e sombra"
                    imageUrl="/logo-ynk.jpg" // Imagem carregada do public
                />
            </div>
        </>
    );
};

export default DemoCursor;
