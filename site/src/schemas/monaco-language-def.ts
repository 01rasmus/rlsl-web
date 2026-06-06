export function makeRlslMonacoLanguageDefinition(source: string): any {
  const structTypes = new Set<string>();
  const functionNames = new Set<string>();
  const structRegex = /\bstruct\s+([A-Za-z_]\w*)/g;
  const functionRegex = /\bfn\s+([A-Za-z_]\w*)/g;

  const commentStrippedSource = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
  for (const match of commentStrippedSource.matchAll(structRegex)) {
    structTypes.add(match[1]);
  }
  for (const match of commentStrippedSource.matchAll(functionRegex)) {
    functionNames.add(match[1]);
  }

  return {
      ...rlslLanguageDefinitionTemplate,
    structTypes: Array.from(structTypes),
    functionNames: Array.from(functionNames),
  };
}

export const rlslMonacoLanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },

  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],

  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "/*", close: " */" },
  ],

  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
  ],
};

export const rlslMonacoTheme = {
    base: "vs-dark",
    inherit: true,

    rules: [
      { token: "identifier.function", foreground: "DCDCAA" },
      // { token: "keyword", foreground: "065d9c" },
      // { token: "keyword.precision", foreground: "065d9c" },
      // { token: "type", foreground: "3b9de3" },
      // { token: "constant", foreground: "569CD6" },
      // { token: "number", foreground: "B5CEA8" },
      // { token: "comment", foreground: "6A9955" },
      // { token: "operator", foreground: "D4D4D4" },
      // { token: "delimiter", foreground: "D4D4D4" },
      // { token: "invalid", foreground: "F44747" },
    ],

    colors: {
        "editor.background": "#000000",
    }
};

const rlslLanguageDefinitionTemplate = {
  defaultToken: "invalid",

  keywords: [
    "uniform",
    "input",
    "output",
    "struct",
    "while",
    "for",
    "if",
    "fn",
    "else",
    "return",
    "const",
  ],

  precisionKeywords: [
    "lowp",
    "mediump",
    "highp",
  ],

  typeKeywords: [
    "void",
    "bool",
    "int",
    "uint",
    "float",
    "double",
    "vec2",
    "vec3",
    "vec4",
    "ivec2",
    "ivec3",
    "ivec4",
    "uvec2",
    "uvec3",
    "uvec4",
    "bvec2",
    "bvec3",
    "bvec4",
    "mat2",
    "mat3",
    "mat4",
    "mat2x2",
    "mat2x3",
    "mat2x4",
    "mat3x2",
    "mat3x3",
    "mat3x4",
    "mat4x2",
    "mat4x3",
    "mat4x4",
  ],

  booleanLiterals: [
    "true",
    "false",
  ],

  tokenizer: {
    root: [
      { include: "@comments" },

      [/[ \t\r\n]+/, "white"],

      [/\d+\.\d*([eE][\-+]?\d+)?/, "number.float"],
      [/\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/\d+[eE][\-+]?\d+/, "number.float"],
      [/0[bB][01]+/, "number.binary"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],

      [/[a-zA-Z_]\w*/, {
        cases: {
          "@keywords": "keyword",
          "@precisionKeywords": "keyword.precision",
          "@typeKeywords": "type",
          "@booleanLiterals": "constant",
          "@structTypes": "type",
          "@functionNames": "identifier.function",
          "@default": "identifier",
        },
      }],

      [/[{}()\[\]]/, "@brackets"],

      [/[;,]/, "delimiter"],
      [/:/, "delimiter"],
      [/\./, "delimiter"],
      [/[\*\-\+\/~&|%!=<>]/, "operator"],
    ],

    comments: [
      [/\/\/.*$/, "comment"],
      [/\/\*/, "comment", "@blockComment"],
    ],

    blockComment: [
      [/[^/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],
  },
};
