// 

import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface LoaderProps {
    size?: number;
    color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 24, color = 'currentColor' }) => {
    return (
        <div className="flex justify-center items-center">
            <LoaderIcon className={`animate-spin text-${color}`} size={size} />
        </div>
    );
};

export default Loader;