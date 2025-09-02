
import React, { useState } from 'react';
import { LogoIcon } from './icons';

interface ApiKeySetupProps {
    onSubmit: (apiKey: string) => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onSubmit }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKey.trim()) {
            onSubmit(apiKey.trim());
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 p-4">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                <div className="flex justify-center items-center space-x-3 mb-6">
                    <LogoIcon />
                    <h1 className="text-2xl font-bold text-white">Blueprint Visualizer</h1>
                </div>
                <h2 className="text-xl font-bold text-center mb-2">Set up Gemini API Key</h2>
                <p className="text-center text-gray-400 mb-6 text-sm">
                    To use the AI features, please provide your Google Gemini API key. Your key is stored only in your browser and never sent to our servers.
                </p>
                 <p className="text-center text-gray-400 mb-6 text-sm">
                    You can get one from{' '}
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        Google AI Studio
                    </a>.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                            Gemini API Key
                        </label>
                        <input
                            id="apiKey"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your API key"
                            required
                            aria-label="Gemini API Key Input"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={!apiKey.trim()}
                    >
                        Save and Continue
                    </button>
                </form>
            </div>
        </div>
    );
};
