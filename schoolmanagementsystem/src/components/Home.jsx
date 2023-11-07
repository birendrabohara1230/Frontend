import React from 'react';
import ShowAllStudents from './ShowAllStudents';
import ShowAllBooks from './ShowAllBooks';
function Home() {
  return (
    <>
      <div className='flex'>
        <div className='max-w-[12rem] h-screen  bg-slate-300 rounded-sm'>
          <ol className='p-8 text-center'>
            <li className='mt-5 hover:bg-slate-400 rounded-lg p-1'>Home</li>
            <li className='mt-5 hover:bg-slate-400 rounded-lg p-1'>Students</li>
            <li className='mt-5 hover:bg-slate-400 rounded-lg p-1'>Books</li>
            <li className='mt-5 hover:bg-slate-400 rounded-lg p-1'>Users</li>
            <li className='mt-5 hover:bg-slate-400 rounded-lg p-1'>History</li>
            <li className='mt-5 hover:bg-slate-400 rounded-lg p-1'>Setting</li>
          </ol>
        </div>
        <div className='bg-slate-950 flex-1 p-2 rounded-sm'>
          {/* <div className='max-w-sm m-1'>
            <label htmlFor="searchField" className="block mb-2 text-sm text-white font-medium ">Search Student</label>
            <input
              type="text" id="searchField"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By student id, name, address, department" required />
          </div>
          <ShowAllStudents /> */}
          <ShowAllBooks />
        </div>
      </div>
    </>
  );
}

export default Home;
