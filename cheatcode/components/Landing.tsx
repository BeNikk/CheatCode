"use client";
import Image from "next/image";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full pt-16 justify-around items-center">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-4"
      >
        <div>
          <p className="p-2 text-4xl font-bold text-[#3B5998]">CheatCode</p>
        </div>
        <div className="">
          <p className="text-md font-medium text-gray-700">
            Level up your coding skills with CheatCode.
            <br />
            Get expert advice, personalised feedbacks and much more
          </p>
        </div>
        <div className="pt-16 flex flex-row gap-2">
          <Link href={'https://github.com/BeNikk/CheatCode'}>
            <Button className="pl-2" variant={'outline'}>
              Give me a Star
            </Button>
          </Link>
          <Link href={'/problems'}>
            <Button className="bg-[#3B5998]">
              Solve Problems
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block"
      >
        <Image src="/code.jpg" alt="CheatCode" width={500} height={400} className="rounded-md" />
      </motion.div>
    </div>
  );
};

export default LandingPage;
