'use client'
import Link from "next/link";
import Image from "next/image";
import { navLists } from "@/constants";
import { appleImg, searchImg, bagImg } from "@/utils";

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
      <nav className='flex w-full screen-max-width'>
        <Link href='/' className="cursor-pointer">
          <Image
            alt='Apple icon'
            src={appleImg}
            width={14}
            height={18}
          />
        </Link>

        <div className='flex flex-1 justify-center max-sm:hidden'>
          {navLists.map((nav) => (
            <div
              className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'
              key={nav}
            >
              <Link href={`/${nav}`} >
              {nav}
              </Link>
            </div>
          ))}
        </div>
        <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
          <Image
            src={searchImg}
            alt=''
            width={18}
            height={18}
          />
          <Image src={bagImg} alt='' width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
