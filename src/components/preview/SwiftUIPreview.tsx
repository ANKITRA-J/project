'use client';

import { useState, useEffect } from 'react';

interface SwiftUIPreviewProps {
  code: string;
}

export function SwiftUIPreview({ code }: SwiftUIPreviewProps) {
  const [preview, setPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Parse the code to extract UI elements
        let previewHtml = '<div class="p-4">';

        // Check for Text elements
        const textMatches = code.match(/Text\(["'](.+?)["']\)/g);
        if (textMatches) {
          textMatches.forEach(match => {
            const content = match.match(/Text\(["'](.+?)["']\)/);
            if (content) {
              previewHtml += `<div class="py-2 px-4 mb-2 text-center">${content[1]}</div>`;
            }
          });
        }

        // Check for Button elements
        const buttonMatches = code.match(/Button\(["'](.+?)["']\)/g) || 
                              code.match(/Button\(action: \{.+?\}\) \{[\s\S]+?Text\(["'](.+?)["']\)[\s\S]+?\}/g);
        
        if (buttonMatches) {
          buttonMatches.forEach(match => {
            const content = match.match(/Button\(["'](.+?)["']\)/) || 
                            match.match(/Text\(["'](.+?)["']\)/);
            if (content) {
              previewHtml += `<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full">
                ${content[1]}
              </button>`;
            }
          });
        }

        // Check for List elements
        if (code.includes('List') && code.includes('ForEach')) {
          previewHtml += `<div class="border border-gray-200 rounded-md overflow-hidden">
            <div class="bg-gray-100 dark:bg-gray-800 py-2 px-4 border-b border-gray-200">List Header</div>
            <div class="divide-y divide-gray-200">
              <div class="py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">List Item 1</div>
              <div class="py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">List Item 2</div>
              <div class="py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700">List Item 3</div>
            </div>
          </div>`;
        }

        // Check for TabView
        if (code.includes('TabView')) {
          previewHtml += `<div class="mt-4 border-t border-gray-200 pt-4">
            <div class="flex border-b border-gray-200">
              <div class="px-4 py-2 border-b-2 border-blue-500 font-medium">Tab 1</div>
              <div class="px-4 py-2 text-gray-500">Tab 2</div>
              <div class="px-4 py-2 text-gray-500">Tab 3</div>
            </div>
            <div class="p-4">
              <p>Tab 1 Content</p>
            </div>
          </div>`;
        }

        // If nothing specific was found, show a basic representation
        if (previewHtml === '<div class="p-4">') {
          previewHtml += `<div class="flex justify-center items-center h-full">
            <div class="text-center p-4 border border-gray-200 rounded-md">
              <p>SwiftUI Preview</p>
              <p class="text-sm text-gray-500">Add SwiftUI elements to see the preview</p>
            </div>
          </div>`;
        }

        previewHtml += '</div>';
        setPreview(previewHtml);
      } catch (err) {
        console.error('Error generating preview:', err);
        setError('Failed to generate preview');
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      generatePreview();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [code]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b p-2">
        <span className="text-sm font-medium">SwiftUI Preview</span>
      </div>
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          <div 
            className="h-full bg-white dark:bg-gray-900 overflow-auto" 
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        )}
      </div>
    </div>
  );
} 