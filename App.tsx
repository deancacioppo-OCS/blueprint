import React, { useState, useCallback } from 'react';
import type { Blueprint, Module } from './types';
import { FileUpload } from './components/FileUpload';
import { WorkflowVisualizer } from './components/WorkflowVisualizer';
import { ModuleDetails } from './components/ModuleDetails';
import { GeminiExplanation } from './components/GeminiExplanation';
import { explainBlueprint } from './services/geminiService';
import { LogoIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

    const handleFileUpload = (content: string) => {
        try {
            const parsed = JSON.parse(content);
            // Basic validation for a Make.com blueprint
            if (parsed.name && parsed.flow && Array.isArray(parsed.flow)) {
                setBlueprint(parsed);
                setError(null);
                setSelectedModule(null); // Reset selection on new upload
                setExplanation(null); // Reset explanation
            } else {
                throw new Error("Invalid blueprint.json format. Missing 'name' or 'flow' properties.");
            }
        } catch (e) {
            const err = e as Error;
            setError(`Failed to parse JSON: ${err.message}`);
            setBlueprint(null);
        }
    };

    const handleModuleSelect = (moduleId: number) => {
        const module = blueprint?.flow.find(m => m.id === moduleId) ?? null;
        setSelectedModule(module);
    };

    const handleGenerateExplanation = useCallback(async () => {
        if (!blueprint) return;
        setIsLoadingExplanation(true);
        setExplanation(null);
        setError(null);
        try {
            const result = await explainBlueprint(blueprint);
            setExplanation(result);
        } catch (e) {
            const err = e as Error;
            setError(`AI Explanation Failed: ${err.message}`);
        } finally {
            setIsLoadingExplanation(false);
        }
    }, [blueprint]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <header className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <LogoIcon />
                        <h1 className="text-2xl font-bold text-white">Make.com Blueprint Visualizer</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                {!blueprint ? (
                    <div className="max-w-xl mx-auto text-center">
                         <h2 className="text-3xl font-semibold mb-4">Upload Your Blueprint</h2>
                         <p className="text-gray-400 mb-6">Select your `blueprint.json` file to visualize the workflow and generate an AI-powered explanation.</p>
                        <FileUpload onFileUpload={handleFileUpload} />
                        {error && <p className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white">{blueprint.name}</h2>
                                <p className="text-gray-400">Workflow visualization of your blueprint.</p>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <button
                                    onClick={handleGenerateExplanation}
                                    disabled={isLoadingExplanation}
                                    className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                                >
                                    <SparklesIcon />
                                    <span className="ml-2">{isLoadingExplanation ? 'Generating...' : 'Explain with AI'}</span>
                                </button>
                                <FileUpload onFileUpload={handleFileUpload} isReconnect={true} />
                           </div>
                        </div>

                        {error && <p className="mb-4 text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
                        
                        <GeminiExplanation explanation={explanation} isLoading={isLoadingExplanation} />
                        
                        <div className="mt-8 flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3 w-full">
                                <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Workflow</h3>
                                <WorkflowVisualizer flow={blueprint.flow} onModuleSelect={handleModuleSelect} selectedModuleId={selectedModule?.id ?? null} />
                            </div>
                            <div className="lg:w-1/3 w-full">
                               <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Module Details</h3>
                                <ModuleDetails module={selectedModule} />
                            </div>
                        </div>
                    </div>
                )}
            </main>
             <footer className="text-center p-4 text-gray-600 mt-8">
                <p>Built by a world-class senior frontend React engineer.</p>
            </footer>
        </div>
    );
};

export default App;
