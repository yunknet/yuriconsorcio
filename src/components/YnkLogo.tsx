const YnkLogo = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg" | "xl"; className?: string }) => {
    const sizeClasses = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-6xl",
    };

    return (
        <div
            className={`flex items-center font-extrabold tracking-tighter ${sizeClasses[size]} ${className}`}
            style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
        >
            <span className="text-gradient-ocean">YNK</span>
            <span className="text-foreground/90 ml-1 font-semibold">Sistemas</span>
        </div>
    );
};

export default YnkLogo;
