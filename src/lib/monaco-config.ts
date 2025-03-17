import * as monaco from 'monaco-editor';

// Only register Swift language on the client side
if (typeof window !== 'undefined') {
  // Register Swift language
  monaco.languages.register({ id: 'swift' });

  // Define Swift syntax highlighting
  monaco.languages.setMonarchTokensProvider('swift', {
    defaultToken: 'invalid',
    tokenizer: {
      root: [
        // Keywords
        [/func|class|struct|enum|protocol|extension|var|let|if|else|for|while|return|true|false|nil|guard|defer|inout|mutating|override|final|lazy|static|weak|unowned|convenience|required|init|deinit|subscript|typealias|associatedtype|where|case|default|break|continue|fallthrough|throw|throws|rethrows|try|catch|do|repeat|switch|import|public|private|internal|fileprivate|open|override|final|lazy|static|weak|unowned|convenience|required|init|deinit|subscript|typealias|associatedtype|where|case|default|break|continue|fallthrough|throw|throws|rethrows|try|catch|do|repeat|switch|import/, 'keyword'],
        
        // Strings
        [/"[^"]*"/, 'string'],
        
        // Comments
        [/\/\/.*$/, 'comment'],
        [/\/\*/, { token: 'comment.quote', next: '@comment' }],
        
        // Numbers
        [/\d+/, 'number'],
        
        // Operators
        [/[+\-*/=<>!&|^%]+/, 'operator'],
        
        // Identifiers
        [/[a-zA-Z_]\w*/, 'identifier'],
        
        // Whitespace
        [/\s+/, 'white'],
      ],
      comment: [
        [/[^*/]+/, 'comment'],
        [/\*\//, { token: 'comment.quote', next: '@pop' }],
        [/./, 'comment'],
      ],
    },
  });
}

// Define Swift editor configuration
export const swiftEditorConfig: monaco.editor.IStandaloneEditorConstructionOptions = {
  language: 'swift',
  theme: 'vs-dark',
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  readOnly: false,
  wordWrap: 'on',
  tabSize: 4,
  insertSpaces: true,
  detectIndentation: true,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  tabCompletion: 'on',
  wordBasedSuggestions: true,
  parameterHints: {
    enabled: true,
    cycle: true,
  },
  snippetSuggestions: 'inline',
  formatOnPaste: true,
  formatOnType: true,
  folding: true,
  foldingStrategy: 'indentation',
  showFoldingControls: 'always',
  renderWhitespace: 'selection',
  renderLineHighlight: 'all',
  renderFinalNewline: true,
  renderLineHighlightOnlyWhenFocus: true,
  scrollbar: {
    vertical: 'visible',
    horizontal: 'visible',
    useShadows: false,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
    verticalSliderSize: 10,
    horizontalSliderSize: 10,
    arrowSize: 30,
  },
  contextmenu: true,
  quickSuggestions: true,
  quickSuggestionsDelay: 10,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  tabCompletion: 'on',
  wordBasedSuggestions: true,
  parameterHints: {
    enabled: true,
    cycle: true,
  },
  snippetSuggestions: 'inline',
  formatOnPaste: true,
  formatOnType: true,
}; 