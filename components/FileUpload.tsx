
import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
    onFileUpload: (content: string) => void;
    isReconnect?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isReconnect = false }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    onFileUpload(text);
                }
            };
            reader.readAsText(file);
        }
        // Reset file input to allow uploading the same file again
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    if (isReconnect) {
        return (
            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json"
                    className="hidden"
                />
                <button
                    onClick={handleClick}
                    className="text-sm text-blue-400 hover:underline"
                >
                    Upload another blueprint
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />
            <div
                onClick={handleClick}
                className="w-full bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-700 transition-colors"
            >
                <div className="flex flex-col items-center">
                    <UploadIcon />
                    <p className="mt-2 text-lg font-semibold text-gray-300">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">blueprint.json</p>
                </div>
            </div>
        </div>
    );
};
