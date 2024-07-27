"use client";
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditor";
import toast from "react-hot-toast";
import { languageOptions } from "./constants/languageOptions";
import LanguageDropdown from "./languageDropdown";
import { Button } from "./ui/button";

const CodePage = () => {
    const [code, setCode] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [language, setLanguage] = useState(languageOptions[0]);
    const onSelectChange = (sl:any) => {
        console.log("selected Option...", sl);
        setLanguage(sl);
      };
      
    useEffect(()=>{
      console.log("selected language",language)
    },[language])

    const onChange = (action:any, data:any) => {
        switch (action) {
          case "code": {
            setCode(data);
            console.log(data);
            break;
          }
          default: {
            console.warn("case not handled!", action, data);
          }
        }
      };

    return ( 
        <div>
          
            <div className="flex flex-row items-center gap-6">  
                <LanguageDropdown onSelectChange={onSelectChange}/>
                <div>
                    <Button variant={'outline'} className="bg-slate-300">Submit</Button>
                </div>
            </div>
            <div>
            <CodeEditorWindow 
            code={code}
            onChange={onChange}
            language={language?.value}
            />
            </div>

        </div>
     );
}
 
export default CodePage;