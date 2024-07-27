"use client";
import { cn } from "@/lib/utils";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
interface CodeEditorWindowProps{
  onChange:any,
  language:string,
  code:string
}
const CodeEditorWindow = ({ onChange, language, code }:CodeEditorWindowProps) => {
  const [value, setValue] = useState(code || "");

 
  const handleEditorChange = (value:any) => {
    setValue(value);
    onChange("code", value);
  };
  return (
    <div className="mt-4 overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
         height="60vh"
         width={"45vw"}
         theme="vs-dark"
         defaultLanguage="javascript"
         language={language || "javascript"}
         onChange={handleEditorChange}
         value={value}
        />
    </div>
  );
};
export default CodeEditorWindow;


