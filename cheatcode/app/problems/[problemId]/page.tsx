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
    const testCases = typeof problem?.testCases === 'string' ? JSON.parse(problem.testCases) : [];

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
                <div>
                     <h3>Test Cases</h3>
            <div className="test-cases">
            {testCases.map((testCase:any, index:number) => (
             <TestCase key={index} testCase={testCase} />
        ))}
      </div>
                    
                </div>

            </div>
            <div>
                <CodeEditorWindow  />

            </div>

        </div>
     );
}
 
export default ProblemIdPage;
interface TestCase {
    input: number[];
    output: number[];
    target?: number;
  }
  
function TestCase({ testCase }:{testCase:TestCase}) {
    return (
        <div className="test-case">
      <p className="text-black">Input: {JSON.stringify(testCase.input)}</p>
      <p>Output: {JSON.stringify(testCase.output)}</p>
      {testCase.target !== undefined && <p>Target: {testCase.target}</p>}
    </div>
    );
  }