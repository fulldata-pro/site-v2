import React from "react";

interface GeminiStarsIconProps {
    color?: string;
    className?: string;
}

const GeminiStarsIcon: React.FC<GeminiStarsIconProps> = ({
    color = "#1E293B", // Slate-800
    className = "",
}) => {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Estrella grande central */}
            <path
                d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z"
                fill={color}
            />

            {/* Estrella pequeña superior izquierda */}
            <g transform="translate(-10, -10) scale(0.6)">
                <path
                    d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z"
                    fill={color}
                />
            </g>

            {/* Estrella pequeña inferior izquierda */}
            <g transform="translate(-5, 50) scale(0.35)">
                <path
                    d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z"
                    fill={color}
                />
            </g>
        </svg>
    );
};

export default GeminiStarsIcon;
