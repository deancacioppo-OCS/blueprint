
import React from 'react';
import type { Module } from '../types';

interface ModuleDetailsProps {
    module: Module | null;
}

const CodeBlock: React.FC<{ data: object }> = ({ data }) => (
    <pre className="bg-gray-900 text-sm text-gray-300 p-4 rounded-md overflow-x-auto">
        <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
);

export const ModuleDetails: React.FC<ModuleDetailsProps> = ({ module }) => {
    if (!module) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg p-8">
                <p className="text-gray-500">Select a module from the workflow to see its details.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-4 rounded-lg space-y-4 h-full">
            <h4 className="text-xl font-bold">{module.label}</h4>
            
            <div className="text-sm">
                <p><span className="font-semibold text-gray-400">ID:</span> {module.id}</p>
                <p><span className="font-semibold text-gray-400">Module:</span> {module.module}</p>
                <p><span className="font-semibold text-gray-400">Version:</span> {module.version}</p>
            </div>
            
            {module.mapper && (
                <div>
                    <h5 className="font-semibold text-gray-300 mb-2">Mapper / Data Mapping</h5>
                    <CodeBlock data={module.mapper} />
                </div>
            )}

            <div>
                <h5 className="font-semibold text-gray-300 mb-2">Full Module Data</h5>
                <CodeBlock data={module} />
            </div>
        </div>
    );
};
