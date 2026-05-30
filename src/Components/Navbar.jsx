import React from 'react'
const Navbar = () => {
  return (

    <nav className=' text-white flex justify-around bg-purple-950 py-2'>
      <div className='px-2'>
        <span className='font-bold'>&lt;</span>
        Password <span className='text-purple-400'>OP</span>
        <span className='font-bold'>/&gt;</span>
      </div>
      <ul className='flex px-1 gap-5 '>
        <li className='cursor-pointer transition-all duration-200 hover:font-semibold'>Home</li>
        <li className='cursor-pointer transition-all duration-200 hover:font-semibold'>Contact us</li>
        <li className='cursor-pointer transition-all duration-200 hover:font-semibold'>About</li>
      </ul>
    </nav>

  )
}

export default Navbar