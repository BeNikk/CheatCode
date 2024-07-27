import { db } from "@/lib/db";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
  

const ProblemPage = async() => {
    const problems=await db.problem.findMany();

    return (
        <div>
            <div className="flex flex-row items-center justify-start mx-12 mt-12 ">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-[#3B5998]">Popular Problems</h1>
                    <p className="text-slate-900">Check out the most popular programming problems on CheatCode</p>
                </div>

            </div>
           
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-12 pt-6 ">
                {problems.map((problem)=>(
                    <Card key={problem.id}>
                    <CardHeader>
                      <CardTitle>{problem.title}</CardTitle>
                      <CardDescription>{problem.difficulty}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{problem.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/problems/${problem.id}`}>
                        <Button className="bg-[#3B5998]">
                            View Problem
                        </Button>
                        </Link>
                    </CardFooter>
                  </Card>
                  
    
                ))}
        </div>
        </div>
     );
}
 
export default ProblemPage;