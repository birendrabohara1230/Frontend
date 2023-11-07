import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dropdown({ label, name, value, onChange }) {

    const [departments, setDepartments] = useState([])

    useEffect(() => {

        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:8080/department/allDepartment")
                const departmentsName = response.data
                setDepartments(departmentsName)
            } catch (error) {
                console.error('Error fetching departments data', error);
            }
        }

        fetchDepartments()

    }, [])


    return (
        <div>
            <div className="relative z-0 w-full mb-6 group">
                <select
                    value={value}
                    name={name}
                    onChange={onChange}
                    id="department" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                        <option value="">Select a department</option>
                    {
                        
                        departments.map((department, index)=>(
                            <option key={index} value={department.id}>{department.departmentName}</option>
                        ))
                    }
                </select>
                <label htmlFor="department" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Dropdown