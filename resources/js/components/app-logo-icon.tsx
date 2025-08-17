import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            {/* Background circle with gradient */}
            <defs>
                <linearGradient id="wineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#800020', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#4B0082', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="wineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#8B0000', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#DC143C', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#8B4513', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#654321', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#FF69B4', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#FF1493', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            
            {/* Cross symbol for church - warm brown */}
            <path
                fill="url(#crossGradient)"
                d="M24 4L22 6V20H6V22H22V36H24V22H42V22H24V6L24 4Z"
            />
            
            {/* Left wine glass - tilted for cheers */}
            <path
                fill="url(#wineGradient1)"
                d="M16 20C16 18 17 17 18 17H20V25C20 26 21 27 22 27H24C25 27 26 26 26 25V17H28C29 17 30 18 30 20V26C30 28 29 29 27 29H23C21 29 20 28 20 26V20H16Z"
                transform="rotate(-15 23 23)"
            />
            
            {/* Right wine glass - tilted for cheers */}
            <path
                fill="url(#wineGradient2)"
                d="M18 20C18 18 19 17 20 17H22V25C22 26 23 27 24 27H26C27 27 28 26 28 25V17H30C31 17 32 18 32 20V26C32 28 31 29 29 29H25C23 29 22 28 22 26V20H18Z"
                transform="rotate(15 25 23)"
            />
            
            {/* Heart symbol for singles/love - vibrant pink */}
            <path
                fill="url(#heartGradient)"
                d="M24 38C24 38 26 36 28 36C30 36 32 38 32 40C32 42 30 44 28 44C26 44 24 42 24 40C24 42 22 44 20 44C18 44 16 42 16 40C16 38 18 36 20 36C22 36 24 38 24 38Z"
            />
            
            {/* OLQP text indicator - elegant dark */}
            <text
                x="24"
                y="12"
                textAnchor="middle"
                fontSize="6"
                fill="#2F4F4F"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
            >
                OLQP
            </text>
        </svg>
    );
}
