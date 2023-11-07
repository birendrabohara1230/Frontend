import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LoadingSkeleton = () => (
    <>
        <div className='text-white text-center bg-lime-700 rounded border'>Fetching books...</div>
    </>
)

function ShowAllBooks() {
    const [books, setBooks] = useState([])
    const [toBeSearchText, setToBeSearchText] = useState('')
    const [cancelToken, setCancelToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const [bookCodeChecked, setBookCodeChecked] = useState(true);
    const [bookNameChecked, setBookNameChecked] = useState(false);
    const [authorNameChecked, setAuthorNameChecked] = useState(false);
    const [departmentChecked, setDepartmentChecked] = useState(false);
    const [reckNumberChecked, setReckNumberChecked] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(false)



    const onChange = async (e) => {
        setIsTableVisible(false)
        const searchText = e.target.value;
        setToBeSearchText(searchText.trim())
        if (!(searchText.trim() === "")) {

            const formData = new FormData()
            formData.append("isBookCode", bookCodeChecked)
            formData.append("isBookName", bookNameChecked)
            formData.append("isAuthorName", authorNameChecked)
            formData.append("isDepartmentName", departmentChecked)
            formData.append("isReckNumber", reckNumberChecked)
            try {
                const response = await fetch('http://localhost:8080/book/searchParams', {
                    method: 'POST',
                    body: formData,
                });
            } catch (error) {
                console.error("Error: ", error);
                return
            }


            // Cancel the previous request if it exists
            if (cancelToken) {
                cancelToken.cancel("Request canceled due to new input");
            }

            const newCancelToken = axios.CancelToken.source();
            setCancelToken(newCancelToken);
            setLoading(true)
            try {
                const response = await axios.get(`http://localhost:8080/book/searchbook/${searchText}`, { cancelToken: newCancelToken.token })
                setBooks(response.data)
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.error("Ignore this Error: ", error);
                } else {
                    alert("Some error occured!")
                    console.error("Error: ", error);
                }
            } finally {
                setLoading(false)
                setIsTableVisible(true)
            }
        }
    }


    // changing the state of checkbox variables

    const handleCheckboxChange = (e) => {
        const checkboxName = e.target.name
        switch (checkboxName) {
            case 'bookCode':
                setBookCodeChecked(!bookCodeChecked);
                break;
            case 'bookName':
                setBookNameChecked(!bookNameChecked);
                break;
            case 'authorName':
                setAuthorNameChecked(!authorNameChecked);
                break;
            case 'departmentName':
                setDepartmentChecked(!departmentChecked);
                break;
            case 'reckNumber':
                setReckNumberChecked(!reckNumberChecked);
                break;
            default:
                break;
        }
    }


    return (
        <div>
            <div className="relative  overflow-x-auto  m-auto max-w-6xl shadow-md sm:rounded-lg">
                <div className='mt-4 mb-2 max-w-md'>
                    <label htmlFor="searchField" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search book</label>
                    <input
                        type="text" id="searchField"
                        name='toBeSearchText'
                        onChange={onChange}
                        value={toBeSearchText}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By bookCode, bookName, Author, Department, Reck No." required />
                </div>
                <div className='mb-2'>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    checked={bookCodeChecked}
                                    name='bookCode'
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    id="bookcode-checkbox-list" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="bookcode-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book Code</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    checked={bookNameChecked}
                                    name='bookName'
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    id="bookname-checkbox-list" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="bookname-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book Name</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    checked={authorNameChecked}
                                    name='authorName'
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    id="authorname-checkbox-list" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="authorname-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Author Name</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    checked={departmentChecked}
                                    name='departmentName'
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    id="department-checkbox-list" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="department-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Department</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input
                                    checked={reckNumberChecked}
                                    name='reckNumber'
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    id="recknumber-checkbox-list" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="recknumber-checkbox-list" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Reck Number</label>
                            </div>
                        </li>
                    </ul>

                </div>
                {

                    loading ? (
                        <LoadingSkeleton />
                    ) : (
                        isTableVisible && (
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Book Code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Book Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Author
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Department
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Reck Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Entry Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead >
                                <tbody>
                                    {
                                        books.map((book, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {book.bookCode}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {book.bookName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {book.authorName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {book.departmentId}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {book.reckNumber}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {book.entryDate}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table >
                        )
                    )
                }
            </div >

        </div >
    )
}

export default ShowAllBooks
