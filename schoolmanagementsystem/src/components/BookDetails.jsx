import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import SubmitBtn from './SubmitBtn';
import Dropdown from './Dropdown';

function BookDetails() {

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Note: Months are 0-indexed (0 = January, 1 = February, etc.)
  const currentDay = currentDate.getDate();
  const todayDate = `${currentYear}-${currentMonth + 1}-${currentDay}`


  // state variables

  const [books, setBooks] = useState({
    numberOfBooks: 1,
    bookName: '',
    authorName: '',
    reckNumber: '',
    entryDate: todayDate,
    departmentId: ''
  })

  // updating state variable based on user interaction

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooks({
      ...books,
      [name]: value,
    });
  };

  // taking care of invalid number of books field entry

  const [isNumeric, setIsNumeric] = useState(false)
  const [msg, setMsg] = useState(1)

  useEffect(() => {
    if (!Number(books.numberOfBooks)) {
      setIsNumeric(true)
      setMsg(2)
    } else {
      setIsNumeric(false)
      setMsg(1)
    }
  }, [books.numberOfBooks])


  // taking care of hover on add button

  const [hover, setHover] = useState(false)




  // sending data to back end
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("entryDate", books.entryDate)
    formData.append("numberOfBooks", books.numberOfBooks)
    formData.append("bookName", books.bookName)
    formData.append("authorName", books.authorName)
    formData.append("departmentId", books.departmentId)
    formData.append("reckNumber", books.reckNumber)
    try {
      const response = await fetch('http://localhost:8080/book/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Book Added Successfully.")
      } else {
        alert("Some problem occurred.")
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  return (
    <div>
      <form className='max-w-lg m-auto mt-3' onSubmit={handleSubmit}>
        <InputField
          label="Entry Date"
          name="entryDate"
          value={books.entryDate}
          onChange={handleChange}
          type="text"
          required
        />
        <div className={`grid md:grid-cols-${msg} md:gap-6`}>
          <InputField
            label="Number Of Books"
            name="numberOfBooks"
            value={books.numberOfBooks}
            onChange={handleChange}
            type="text"
            required
          />
          {isNumeric && (
            <div>
              <p className='text-blue-600 mt-3'>Please enter numeric value.</p>
            </div>
          )
          }
        </div>
        <InputField
          label="Name Of Book"
          name="bookName"
          value={books.bookName}
          onChange={handleChange}
          type="text"
          required
        />
        <div className={`grid md:grid-cols-2 md:gap-4`}>
          <InputField
            label="Name Of Authors"
            name="authorName"
            value={books.authorName}
            onChange={handleChange}
            type="text"
            required
          />
          <div>
            <div className='relative h-20'>
              <button
                type='button'
                className='bg-lime-700  p-1 px-2 rounded-lg outline-none text-white mt-2 shadow-lg'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Add
              </button>
              {
                hover && (
                  <p className='absolute bottom-0 border bg-green-900  border-green-600 p-1 rounded-lg text-white outline-none'>Add More Book Authors</p>
                )
              }
            </div>
          </div>
        </div>
        {/* If book has more than one author */}

        <InputField
          label="Reck Number"
          name="reckNumber"
          value={books.reckNumber}
          onChange={handleChange}
          type="text"
          required
        />
        <Dropdown
          label=""
          name="departmentId"
          value={books.departmentId}
          onChange={handleChange}
        />
        <SubmitBtn
          label="Submit"
          type="submit"
        />
      </form>
    </div>
  )
}

export default BookDetails
