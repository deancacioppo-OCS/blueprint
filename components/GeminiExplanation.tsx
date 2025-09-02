
import React from 'react';
import { SparklesIcon, AiBotIcon } from './icons';

interface GeminiExplanationProps {
    explanation: string | null;
    isLoading: boolean;
}

export const GeminiExplanation: React.FC<GeminiExplanationProps> = ({ explanation, isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full bg-gray-800 p-6 rounded-lg border border-purple-500/50 flex items-center space-x-4">
                <div className="animate-spin text-purple-400">
                    <SparklesIcon />
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-white">Generating AI Explanation...</h4>
                    <p className="text-gray-400">Our AI is analyzing your blueprint. This may take a moment.</p>
                </div>
            </div>
        );
    }

    if (!explanation) {
        return null;
    }

    return (
        <div className="w-full bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
                <AiBotIcon/>
                <h4 className="font-semibold text-xl text-white">AI-Generated Summary</h4>
            </div>
            <div className="prose prose-invert prose-sm text-gray-300 whitespace-pre-wrap">
                {explanation.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
};
