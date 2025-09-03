
import React, { useState } from 'react';
import type { Module } from '../types';
import { executeModule, type ExecutionResult } from '../services/executionService';

interface ModuleDetailsProps {
    module: Module | null;
}

const CodeBlock: React.FC<{ data: object }> = ({ data }) => (
    <pre className="bg-gray-900 text-sm text-gray-300 p-4 rounded-md overflow-x-auto">
        <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
);

const ExecutionResult: React.FC<{ result: ExecutionResult }> = ({ result }) => (
    <div className={`p-4 rounded-md border ${result.success ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
        <div className="flex items-center mb-2">
            <span className={`text-sm font-semibold ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                {result.success ? '✅ Execution Successful' : '❌ Execution Failed'}
            </span>
        </div>
        {result.error && (
            <p className="text-red-300 text-sm mb-2">{result.error}</p>
        )}
        {result.message && (
            <p className="text-gray-300 text-sm mb-2">{result.message}</p>
        )}
        {result.data && (
            <div>
                <h6 className="text-gray-400 text-xs font-semibold mb-1">Response Data:</h6>
                <CodeBlock data={result.data} />
            </div>
        )}
    </div>
);

export const ModuleDetails: React.FC<ModuleDetailsProps> = ({ module }) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
    const [inputData, setInputData] = useState('{}');

    if (!module) {
        return (
            <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg p-8">
                <p className="text-gray-500">Select a module from the workflow to see its details.</p>
            </div>
        );
    }

    const handleExecuteModule = async () => {
        setIsExecuting(true);
        setExecutionResult(null);

        try {
            const parsedInputData = JSON.parse(inputData);
            const result = await executeModule(module, parsedInputData);
            setExecutionResult(result);
        } catch (error) {
            setExecutionResult({
                success: false,
                error: error instanceof Error ? error.message : 'Invalid input data JSON'
            });
        } finally {
            setIsExecuting(false);
        }
    };

    const canExecute = module.module.toLowerCase().includes('http') || 
                      module.module.toLowerCase().includes('json') || 
                      module.module.toLowerCase().includes('webhook');

    return (
        <div className="bg-gray-800 p-4 rounded-lg space-y-4 h-full overflow-y-auto">
            <h4 className="text-xl font-bold">{module.label}</h4>
            
            <div className="text-sm">
                <p><span className="font-semibold text-gray-400">ID:</span> {module.id}</p>
                <p><span className="font-semibold text-gray-400">Module:</span> {module.module}</p>
                <p><span className="font-semibold text-gray-400">Version:</span> {module.version}</p>
            </div>

            {/* Execution Section */}
            {canExecute && (
                <div className="border-t border-gray-700 pt-4">
                    <h5 className="font-semibold text-gray-300 mb-3">🚀 Execute Module</h5>
                    
                    <div className="mb-3">
                        <label className="block text-xs font-semibold text-gray-400 mb-1">
                            Input Data (JSON):
                        </label>
                        <textarea
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            className="w-full h-20 px-3 py-2 bg-gray-900 border border-gray-600 rounded text-gray-200 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder='{"key": "value"}'
                        />
                    </div>

                    <button
                        onClick={handleExecuteModule}
                        disabled={isExecuting}
                        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-md font-semibold transition-colors flex items-center justify-center"
                    >
                        {isExecuting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Executing...
                            </>
                        ) : (
                            '▶️ Execute Module'
                        )}
                    </button>

                    {executionResult && (
                        <div className="mt-4">
                            <ExecutionResult result={executionResult} />
                        </div>
                    )}
                </div>
            )}

            {!canExecute && (
                <div className="border-t border-gray-700 pt-4">
                    <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-md p-3">
                        <p className="text-yellow-300 text-sm">
                            ⚠️ This module type ({module.module}) is not yet supported for execution.
                        </p>
                    </div>
                </div>
            )}
            
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
