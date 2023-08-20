"use client"
import { Web3Button } from "@web3modal/react";


const Navbar: React.FC = (): JSX.Element => {
    return (
      <div className="flex w-[100%] items-center flex-row-reverse">
        <div className="relative top-4 right-[13px]">
          <Web3Button />
        </div>
      </div>
    );
}

export default Navbar