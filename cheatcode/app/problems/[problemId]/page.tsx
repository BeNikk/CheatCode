import CodePage from "@/components/Code";
import CodeEditorWindow from "@/components/CodeEditor";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const ProblemIdPage = async({params}:{params:{problemId:number}}) => {
    const {userId}=auth();
    if(!userId){
        return redirect('/');
    }

    const problem=await db.problem.findUnique({
        where:{
            id:Number(params.problemId)
        }
    })
    const testCasesArray:any= Array.isArray(problem?.testCases) ? problem.testCases : [];
;
          return ( 
        <div className="mx-16 flex flex-col lg:flex-row items-start justify-around mt-16">
            <div className=" flex flex-col items-start justify-start gap-8">
                <div className="flex flex-col gap-2">
                    <p className="text-3xl font-bold text-[#3B5998]">{problem?.title}</p>
                    <p className="text-md font-medium">{problem?.difficulty}</p>
                </div>
                <div>
                    <p className="text-lg font-semibold">{problem?.description}</p>
                </div>
               
                <div className=" flex flex-col gap-4">
                {testCasesArray.map((cases:any, index:any) => {
                  if (cases === null) return;
                  const { input, output, target } = cases;
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Input:</span>
                        <pre className="flex-grow bg-gray-100 p-2 -mt-1 rounded">{JSON.stringify(input)}</pre>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold">Output:</span>
                        <pre className="flex-grow bg-gray-100 p-2 -mt-1 rounded">{JSON.stringify(output)}</pre>
                      </div>
                      {target !== undefined && (
                        <div className="">
                          <span className="font-bold ">Target:</span>
                          <span className="m-2 p-2">{target}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <CodePage/>

            </div>

        </div>
     );
}
 
export default ProblemIdPage;
