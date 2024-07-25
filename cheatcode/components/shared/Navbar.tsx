import { UserButton } from "@clerk/nextjs";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return ( 
        <div className="fixed z-10 top-0 w-screen h-16 bg-[#3B5998] flex flex-row items-center justify-between px-12 rounded-sm">
            <Link href={'/'}>
            <div className="flex flex-row items-center gap-2">
                <Image src={'/logoipsum-296.svg'} alt="Logo" width={16} height={16}/>
                <p className="text-white font-bold text-2xl">CheatCode</p>
            </div>
            </Link>
            <div className="">
                <Link href={'/problems'}>
                <div className="text-white font-semibold text-lg hover:text-gray-400 hover:underline">
                    Problems
                </div>
                </Link>
            </div>
            <div className="flex items-center gap-12">
                <div>
                    <Link href={'https://github.com/BeNikk/CheatCode'}>
                    <StarIcon className="size-4 text-white"/>
                    </Link>
                </div>
                <div className="mt-1">
                <UserButton/>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;