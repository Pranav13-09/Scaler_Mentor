import React, { useState } from 'react';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';

const Header = () => {
    let Links =[
        {name:"Create Group",link:"/"},
        {name:"Evaluation",link:"/marks"},
        {name:"View Students",link:"/view"},
        
      ];
      let [open, setOpen] =useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 bg-blue-700'>
           <div className='md:flex items-center justify-between  py-4 md:px-10 px-7'>
          
            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
             
                <span className='text-white'> EduMentor</span>
            </div>
            
            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon/> : <Bars3BottomRightIcon />
                }
            </div>
          
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-blue-700 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                {
                    Links.map((link,index) => (
                        <li key={index} className='md:ml-8 md:my-0 my-7 font-semibold'>
                        <Link href={link.link} className='text-white '>{link.name}</Link>
                    </li>))
                }
               
            </ul>
           
           </div>
        </div>
    );
};

export default Header;