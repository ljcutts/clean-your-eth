"use client"
import { Web3Button } from "@web3modal/react";
import Link from "next/link";


const Navbar: React.FC = (): JSX.Element => {
    return (
      <div className="flex justify-between p-4 w-[100%] items-center">
        <div className="flex relative bottom-1 items-center">
          <h1 className="text-white font-bold text-xl mr-3">CleanYourETH</h1>
          <img src="./eth.png" width={20} height={20} alt="" />
        </div>
        <div className="hidden sm:flex cursor-pointer rounded-xl p-3 hover:opacity-50 bg-crypto font-bold text-white w-auto">
          <Link className="cursor-pointer" href={`/faq`}>
            How It Works
          </Link>
        </div>
        <div>
          <Web3Button />
        </div>
      </div>
    );
}

export default Navbar