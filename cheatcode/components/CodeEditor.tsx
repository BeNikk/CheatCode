"use client";
import { cn } from "@/lib/utils";
import { Editor } from "@monaco-editor/react";
const CodeEditorWindow = () => {
 
  return (
    <div className=" mt-16 overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
         height="60vh"
         width={"45vw"}
         theme="vs-dark"
         defaultValue="//write your code here"
         defaultLanguage="javascript"
        
        />
    </div>
  );
};
export default CodeEditorWindow;