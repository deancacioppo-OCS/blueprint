
import React from 'react';
import type { Module } from '../types';
import { ModuleNode } from './ModuleNode';
import { ArrowIcon } from './icons';

interface WorkflowVisualizerProps {
    flow: Module[];
    selectedModuleId: number | null;
    onModuleSelect: (moduleId: number) => void;
}

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ flow, selectedModuleId, onModuleSelect }) => {
    if (!flow || flow.length === 0) {
        return <p className="text-gray-500">No workflow steps found in the blueprint.</p>;
    }

    // Sort modules by their x-coordinate to ensure correct visual order
    const sortedFlow = [...flow].sort((a, b) => a.metadata.designer.x - b.metadata.designer.x);

    return (
        <div className="p-4 bg-gray-800 rounded-lg overflow-x-auto">
            <div className="flex items-center space-x-4">
                {sortedFlow.map((module, index) => (
                    <React.Fragment key={module.id}>
                        <ModuleNode
                            module={module}
                            isSelected={module.id === selectedModuleId}
                            onClick={() => onModuleSelect(module.id)}
                        />
                        {index < sortedFlow.length - 1 && (
                            <div className="flex-shrink-0 text-gray-500">
                                <ArrowIcon />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
