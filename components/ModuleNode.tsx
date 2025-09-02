
import React from 'react';
import type { Module } from '../types';
import { WebhookIcon, ApiIcon, JsonIcon, RouterIcon, GenericModuleIcon } from './icons';

interface ModuleNodeProps {
    module: Module;
    isSelected: boolean;
    onClick: () => void;
}

const getModuleIcon = (moduleName: string) => {
    const lowerModuleName = moduleName.toLowerCase();
    if (lowerModuleName.includes('webhook')) return <WebhookIcon />;
    if (lowerModuleName.includes('http') || lowerModuleName.includes('highlevel')) return <ApiIcon />;
    if (lowerModuleName.includes('json')) return <JsonIcon />;
    if (lowerModuleName.includes('router')) return <RouterIcon />;
    return <GenericModuleIcon />;
};

export const ModuleNode: React.FC<ModuleNodeProps> = ({ module, isSelected, onClick }) => {
    const moduleType = module.module.split(':')[1] || module.module;
    const icon = getModuleIcon(module.module);

    const selectedClasses = 'border-blue-500 ring-2 ring-blue-500';
    const baseClasses = 'flex flex-col items-center justify-center w-40 h-40 p-4 bg-gray-700 border-2 border-gray-600 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-200';

    return (
        <div className={`${baseClasses} ${isSelected ? selectedClasses : ''}`} onClick={onClick}>
            <div className="text-purple-400 mb-2">{icon}</div>
            <p className="text-sm font-semibold text-center text-gray-200 break-words">{module.label}</p>
            <p className="text-xs text-gray-400 mt-1 capitalize">{moduleType}</p>
        </div>
    );
};
