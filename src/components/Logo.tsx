// src/components/Logo.js
import React from 'react';

const Logo = () => {
    return (
        <div className="logo pt-6" >
            <svg width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <g>
                    <path d="M20,30 C20,30 40,10 60,10 C80,10 100,30 100,30 C100,30 120,10 140,10 C160,10 180,30 180,30 C180,30 170,50 150,50 C130,50 110,30 110,30 C110,30 100,60 100,60 C100,60 110,90 130,90 C150,90 170,60 170,60 C170,60 180,30 180,30 C180,30 180,50 160,50 C140,50 120,30 120,30 C120,30 100,10 80,10 C60,10 40,30 40,30 C40,30 20,50 20,50 C20,50 20,30 20,30 Z" fill="#FF6600" />
                    <path d="M40,70 C40,70 50,90 70,90 C90,90 110,70 110,70 C110,70 120,90 140,90 C160,90 180,70 180,70 C180,70 170,50 150,50 C130,50 110,70 110,70 C110,70 100,90 100,90 C100,90 110,110 130,110 C150,110 170,90 170,90 C170,90 180,70 180,70 C180,70 180,50 160,50 C140,50 120,70 120,70 C120,70 100,90 80,90 C60,90 40,70 40,70 Z" fill="#999999" />
                    <path d="M60,100 C60,100 70,120 90,120 C110,120 130,100 130,100 C130,100 120,80 100,80 C80,80 60,100 60,100 Z" fill="#999999" />
                    <path d="M100,100 L120,120 L120,140 L100,160 L80,140 L80,120 Z" fill="#FF0000" />
                    <text x="60" y="190" font-size="40" text-anchor="middle" fill="#aee342">DEALS</text>
                    <text x="50" y="210" font-size="12" text-anchor="middle" fill="#000000">TAGLINE HERE</text>
                </g>
            </svg>
        </div>
    );
};

export default Logo;