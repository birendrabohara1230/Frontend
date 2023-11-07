import { useState, useEffect } from 'react';
import axios from 'axios';


const ShowAllStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/student/all");
        const studentDetail = response.data;
        //when we search a student it returns an object. Object is converted into array here.
        if (Array.isArray(studentDetail)) {
          setStudents(studentDetail)
        } else {
          const convArray = []
          convArray.push(studentDetail)
          setStudents(convArray)
        }
      } catch (error) {
        console.error('Error fetching student data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto max-w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-3">
                Roll Number
              </th>
              <th scope="col" className="px-1 py-3">
                First Name
              </th>
              <th scope="col" className="px-1 py-3">
                Last Name
              </th>
              <th scope="col" className="px-1 py-3">
                Father Name
              </th>
              <th scope="col" className="px-1 py-3">
                Mother Name
              </th>
              <th scope="col" className="px-1 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-1 py-3">
                Email
              </th>
              <th scope="col" className="px-1 py-3">
                Address
              </th>
              <th scope="col" className="px-1 py-3">
                Date Of Birth
              </th>
              <th scope="col" className="px-1 py-3">
                Department
              </th>
              <th scope="col" className="px-1 py-3">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNumber} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-1 py-4">
                  {student.rollNumber}
                </td>
                <td className="px-1 py-4">
                  {student.firstName}
                </td>
                <td className="px-1 py-4">
                  {student.lastName}
                </td>
                <td className="px-1 py-4">
                  {student.fatherName}
                </td>
                <td className="px-1 py-4">
                  {student.motherName}
                </td>
                <td className="px-1 py-4">
                  {student.phoneNumber}
                </td>
                <td className="px-1 py-4">
                  {student.email}
                </td>
                <td className="px-1 py-4">
                  {student.address}
                </td>
                <td className="px-1 py-4">
                  {student.dateOfBirth}
                </td>
                <td className="px-1 py-4">
                  {student.departmentId}
                </td>
                <td className="px-1 py-4">
                  <img src={`../../photos/${student.imageUrl}`} alt="Image" className='w-24 h-24 border rounded-lg' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};

export default ShowAllStudents;