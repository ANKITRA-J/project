'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, File, Folder, Plus, Trash2, Edit2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

const initialFiles: FileNode[] = [
  {
    name: 'Sources',
    type: 'folder',
    children: [
      {
        name: 'main.swift',
        type: 'file',
        content: '// Your Swift code here',
      },
      {
        name: 'ContentView.swift',
        type: 'file',
        content: 'import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text("Hello, World!")\n    }\n}',
      },
    ],
  },
  {
    name: 'Tests',
    type: 'folder',
    children: [
      {
        name: 'SwiftyTests.swift',
        type: 'file',
        content: 'import XCTest\n\nclass SwiftyTests: XCTestCase {\n    func testExample() {\n        XCTAssertTrue(true)\n    }\n}',
      },
    ],
  },
];

export function FileExplorer() {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Sources']));
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
    // TODO: Load file content into editor
  };

  const handleNewFile = () => {
    const newFile: FileNode = {
      name: 'NewFile.swift',
      type: 'file',
      content: '// New Swift file',
    };
    setFiles(prev => [...prev, newFile]);
    toast({
      title: 'New file created',
      description: 'NewFile.swift has been created',
    });
  };

  const handleDelete = (file: FileNode) => {
    setFiles(prev => prev.filter(f => f !== file));
    toast({
      title: 'File deleted',
      description: `${file.name} has been deleted`,
    });
  };

  const handleRename = (file: FileNode) => {
    setIsEditing(true);
    setNewName(file.name);
    inputRef.current?.focus();
  };

  const handleRenameSubmit = (file: FileNode) => {
    if (newName.trim()) {
      setFiles(prev => prev.map(f => 
        f === file ? { ...f, name: newName.trim() } : f
      ));
      setIsEditing(false);
      toast({
        title: 'File renamed',
        description: `${file.name} has been renamed to ${newName.trim()}`,
      });
    }
  };

  const renderFileNode = (node: FileNode, path: string = '') => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(currentPath);
    const isFolder = node.type === 'folder';
    const isSelected = selectedFile === node;

    return (
      <ContextMenu key={currentPath}>
        <ContextMenuTrigger>
          <div
            className={`flex items-center gap-1 px-2 py-1 hover:bg-muted rounded cursor-pointer ${
              isSelected ? 'bg-muted' : ''
            }`}
            onClick={() => !isFolder && handleFileSelect(node)}
          >
            {isFolder ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : null}
            {isFolder ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <File className="h-4 w-4 text-gray-500" />
            )}
            {isEditing && selectedFile === node ? (
              <input
                ref={inputRef}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => handleRenameSubmit(node)}
                onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit(node)}
                className="flex-1 bg-transparent border-none focus:outline-none"
                autoFocus
              />
            ) : (
              <span className="text-sm">{node.name}</span>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => handleRename(node)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleDelete(node)} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-2">
        <h2 className="text-sm font-semibold">Project Navigator</h2>
        <Button variant="ghost" size="sm" onClick={handleNewFile}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {files.map((node) => renderFileNode(node))}
      </div>
    </div>
  );
} 