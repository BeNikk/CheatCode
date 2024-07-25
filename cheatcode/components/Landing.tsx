import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const LandingPage = () => {
    return (
         
        <div className="flex flex-row h-full pt-16 justify-around ">
            <div className="flex flex-col items-start gap-4">
                <div>
                    <p className="text-4xl font-bold text-[#3B5998] ">CheatCode</p>
                </div>
                <div className="">
                    <p className="text-md font-medium text-gray-700">Level up your coding skills with CheatCode.
                        <br />
                        Get expert advice, personalised feedbacks and much more
                    </p>
                </div>
                <div className="pt-16 flex flex-row gap-2">
                    <Link href={'/learn'}>
                    <Button variant={'outline'}>
                        Learn
                    </Button>
                    </Link>
                    <Link href={'/problems'}>
                    <Button className="bg-[#3B5998]">
                       Solve Problems
                    </Button>
                    </Link>

                </div>

            </div>
            <div className="hidden lg:block">
                <img src="/code.jpg" alt="CheatCode" width={'500'} height={'400'} className="rounded-md" />
            </div>

        </div>
        
     );
}
 
export default LandingPage;