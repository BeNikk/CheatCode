"use client";
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditor";
import axios from "axios";
import toast from "react-hot-toast";
import { languageOptions } from "./constants/languageOptions";
import LanguageDropdown from "./languageDropdown";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Loader from "./Loader";
import Spinner from "./Loader";

const CodePage = ({ problem }: any) => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState(languageOptions[0]);
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
      setIsModalOpen(false);
  };

    const onSelectChange = (sl: any) => {
        setLanguage(sl);
    };

    

    const onChange = (action: any, data: any) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    async function handleCompile() {
        try {
            setLoading(true);
            const prompt = `
            You are a code review assistant. Analyze the following code based on the given problem description.
            
            Problem Description: ${problem.description}
            
            User Code:
            ${code}
            
            Provide feedback on the code, where the user's solution is lagging, suggest optimizations, and indicate if the code solves the problem correctly.
            If the solution is correct,appreciate the candidate
            Please do not give a solution and only give hints towards the most optimal solution.Treat the user as a student of yours willing to learn.
            `;
           
            const response = await axios.post("/api/chat", { prompt });
            const { codeEvaluation } = response.data;
            setData(codeEvaluation);
            setIsModalOpen(true);
        } catch (error) {
          setLoading(false);
            console.log(error);
            toast.error("Some error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Spinner />
        </div>
          )}
            <div className="flex flex-row items-center gap-6">  
                <LanguageDropdown onSelectChange={onSelectChange} />
                <div>
                    <Button variant={'outline'} className="bg-slate-300" disabled={loading} onClick={handleCompile}>
                        Submit
                    </Button>
                </div>
            </div>
            <div>
                <CodeEditorWindow 
                    code={code}
                    onChange={onChange}
                    language={language?.value}
                />
                {data==null && (<></>)}
              {data!=null && (
                <ModalOpen 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={data}/>

              )}
               

            </div>
        </div>
    );
};

export default CodePage;


function ModalOpen({ isOpen, data, onClose }: { isOpen: boolean; data: any; onClose: () => void }) {
  const {
    presentCodeCorrectorNotBoolean,
    reasonWhyCurrentCodeIsIncorrectOrCorrectDescriptive,
    edgeCaseCheck,
    betterSolutionIfany,
    hintsAndTheirReason,
    topicsToLearnDescriptive,
  } = data;

  if (!isOpen) {
    return null; // Return null if the modal is not open
  }

  return (
    <>
      {/* Overlay with blur effect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50" />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg max-h-[calc(100vh-4rem)] overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#3B5998]">Personalized Solution Check</CardTitle>
              <CardDescription>
                <p className="text-lg font-medium text-black">
                  <span className="text-[#3B5998]">Is Your Present Code Correct? </span>
                  <br />
                  <span>{presentCodeCorrectorNotBoolean}</span>
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-black">
                <span className="text-[#3B5998]">Reason</span>
                <br />
                {reasonWhyCurrentCodeIsIncorrectOrCorrectDescriptive}
              </p>
              <p className="text-lg font-medium text-black">
                <span className="text-[#3B5998]">Edge Cases Check- </span>
                <br /> {edgeCaseCheck}
              </p>
              <p className="text-lg font-medium text-black">
                <span className="text-[#3B5998]">Hints- </span>
                <br /> {hintsAndTheirReason}
              </p>
              <p className="text-lg font-medium text-black">
                <span className="text-[#3B5998]">Topics to Focus On</span>
                <br />
                {topicsToLearnDescriptive}
              </p>
              <p className="text-lg font-medium text-black">
                <span className="text-[#3B5998]">Better Solution If Any</span>
                <br />
                { betterSolutionIfany}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={onClose} className="bg-[#3B5998]">
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

 
