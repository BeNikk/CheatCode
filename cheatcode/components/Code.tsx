"use client";
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditor";
import axios from "axios";
import toast from "react-hot-toast";
import { languageOptions } from "./constants/languageOptions";
import LanguageDropdown from "./languageDropdown";
import { Button } from "./ui/button";
import dotenv from 'dotenv';
dotenv.config();
const CodePage = () => {
    const [code, setCode] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [language, setLanguage] = useState(languageOptions[0]);
    const judge0ApiKey = process.env.REACT_APP_RAPID_API_KEY;
    const checkStatus = async (submissionToken: string) => {
      try {
        const response = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}/`,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key':judge0ApiKey,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
          }
        );
  
        const statusId = response.data.status?.id;
  
        if (statusId === 1 || statusId === 2) {
          setTimeout(() => {
            checkStatus(submissionToken);
          }, 2000);
        
        } else {
          if (statusId === 3) { 
            const outputData = response.data; 
            toast.success("Compiled"); 
          } else {
            toast.error("Compilation failed");
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
        toast.error("something went wrong");
      }
    };
  

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
      async function handleCompile(){
        try {
            const codeSent=btoa(code);
            const languageSent=language.id
            

          
          const response = await axios.post(
            'https://judge0-ce.p.rapidapi.com/submissions/',
            {
              language_id: languageSent,
              source_code: codeSent,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': judge0ApiKey,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
              },
            }
          );
          const submissionToken = response.data.token;  
          checkStatus(submissionToken);
          
        } catch (error) {
          console.log("error",error);
          toast.error("Something went wrong");
          
        }
      }
      

    return ( 
        <div>
          
            <div className="flex flex-row items-center gap-6">  
                <LanguageDropdown onSelectChange={onSelectChange}/>
                <div>
                    <Button variant={'outline'} className="bg-slate-300" onClick={handleCompile}>Submit</Button>
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