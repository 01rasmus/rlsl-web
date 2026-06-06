import { Editor, type Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { makeRlslMonacoLanguageDefinition, rlslMonacoLanguageConfiguration, rlslMonacoTheme } from '../schemas/monaco-language-def';
import { errors_schema, type Errors } from '../schemas/compiler-outputs';
import { jsonParseOrDefault } from '../tools/json';

declare global {
  interface Window {
    createRlslModule: (options?: unknown) => Promise<any>;
  }
}

const mod = await window.createRlslModule({
  locateFile(path: string) {
    if (path.endsWith(".wasm")) {
      return "/wasm/rlsl_web.wasm";
    }

    return path;
  },
});

const rlslValidate = mod.cwrap(
  "rlsl_validate",
  "string",
  ["string"]
);

const freeString = mod.cwrap(
  "rlsl_free_string",
  "void",
  ["string"]
)

export const PLAYGROUND_ROUTE = "/playground";

const DEFAULT_CODE = `struct Light {
    vec3 position;
    float strength;
};

uniform(0) light {
    Light lights[10];
};

fn main() -> void {

}`

export default function Playground() {
    
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const debounceRef = useRef<number | null>(null);
  const [output, setOutput] = useState("");
  
  const onMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco): void => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    onChange(DEFAULT_CODE);
    
    monaco.editor.defineTheme("rlsl-dark", rlslMonacoTheme);
    monaco.editor.setTheme("rlsl-dark");

    if(!monaco.languages.getLanguages().some(({id}: { id: string }) => id === "rlsl")) {
      monaco.languages.register({ id: "rlsl" });
      monaco.languages.setMonarchTokensProvider("rlsl", makeRlslMonacoLanguageDefinition(DEFAULT_CODE));
      monaco.languages.setLanguageConfiguration("rlsl", rlslMonacoLanguageConfiguration)
    }
  };

  const onChange = (value?: string): void => {
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      if(!monacoRef.current || !editorRef.current) {
        return;
      }

      const err_str = rlslValidate(value ?? "");
      const errs = errors_schema.safeParse(jsonParseOrDefault(err_str));
      if(errs.success) {
        setRlslErrors(monacoRef.current, editorRef.current, errs.data);
        setOutput(JSON.stringify(errs.data.errors));
      }
      freeString(err_str);
    }, 300);
  };

  return (
    <Container>
        <PlaygroundArea>
            <Toolbar>
            </Toolbar>
            <HorizontalContainer>
                <EditorContainer>
                    <Editor
                        height="100%"
                        width="100%"
                        defaultLanguage="rlsl"
                        defaultValue={DEFAULT_CODE}
                        theme='vs-dark'
                        onMount={onMount}
                        onChange={onChange}
                        options={{
                            automaticLayout: true,
                            dragAndDrop: false,
                        }}
                    />
                </EditorContainer>
                <Spacer />
                <RenderView>{output}</RenderView>
            </HorizontalContainer>
        </PlaygroundArea>
    </Container>
  )
}

function setRlslErrors(
  monaco: Monaco,
  editor: editor.IStandaloneCodeEditor,
  errors: Errors,
): void {
  const model = editor.getModel();
  if (!model) {
    return;
  }

  monaco.editor.setModelMarkers(
    model,
    "rlsl",
    errors.errors.map((error) => ({
      severity: monaco.MarkerSeverity.Error,
      message: error.message,
      startLineNumber: error.range.start.line,
      startColumn: error.range.start.column,
      endLineNumber: error.range.end.line,
      endColumn: error.range.end.column,
    })),
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid red;
  height: 100%;
  padding: 1rem;
  min-width: 0;
  min-height: 0;
`;

const Toolbar = styled.div`
  height: 2rem;
  background: #151515;
  border-bottom: 0.1rem solid #747474;
  min-width: 0;
  min-height: 0;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

const PlaygroundArea = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #747474;
  height: 100%;
  width: 100%;
  min-width: 0;
  min-height: 0;
`;

const EditorContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const RenderView = styled.div`
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  flex: 1;
  min-width: 0;
  min-width: 0;
  min-height: 0;
`;

const Spacer = styled.div`
  width: 0.1rem;
  height: 100%;
  border-left: 0.1rem solid #747474;
  background: #000000;
`;