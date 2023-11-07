import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import Dropdown from './Dropdown';
import SubmitBtn from './SubmitBtn';
import FileInputField from './FileInputField';

function Student_details() {
  const [studentData, setStudentData] = useState({
    rollNumber: '',
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    phoneNumber: '',
    email: '',
    address: '',
    dateOfBirth: '',
    departmentId: '',
    studentImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };


  const handleChangeFile = (e) => {
    setStudentData({
      ...studentData,
      studentImage: e.target.files[0],
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('rollNumber', studentData.rollNumber);
    formData.append('firstName', studentData.firstName);
    formData.append('lastName', studentData.lastName);
    formData.append('fatherName', studentData.fatherName);
    formData.append('motherName', studentData.motherName);
    formData.append('phoneNumber', studentData.phoneNumber);
    formData.append('email', studentData.email);
    formData.append('address', studentData.address);
    formData.append('dateOfBirth', studentData.dateOfBirth);
    formData.append('departmentId', studentData.departmentId);
    formData.append('studentImage', studentData.studentImage);

    try {
      const response = await fetch('http://localhost:8080/student/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Student Added Successfully.")
      } else {
        alert("Some problem occurred.")
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <>
      <form className='max-w-sm m-auto mt-3' onSubmit={handleSubmit}>
        <InputField
          label="Roll Number"
          name="rollNumber"
          value={studentData.rollNumber}
          onChange={handleChange}
          type="text"
          required
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label="First Name"
            name="firstName"
            value={studentData.firstName}
            onChange={handleChange}
            type="text"
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={studentData.lastName}
            onChange={handleChange}
            type="text"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label="Father Name"
            name="fatherName"
            value={studentData.fatherName}
            onChange={handleChange}
            type="text"
            required
          />
          <InputField
            label="Mother Name"
            name="motherName"
            value={studentData.motherName}
            onChange={handleChange}
            type="text"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={studentData.phoneNumber}
            onChange={handleChange}
            type="text"
            required
          />
          <InputField
            label="Email Address"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            type="email"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label="Address"
            name="address"
            value={studentData.address}
            onChange={handleChange}
            type="text"
            required
          />
          <InputField
            label="Date Of Birth"
            name="dateOfBirth"
            value={studentData.dateOfBirth}
            onChange={handleChange}
            type="date"
            required
          />
        </div>
        <Dropdown
          label=""
          name="departmentId"
          value={studentData.departmentId}
          onChange={handleChange}
        />
        <div className="relative z-0 w-full mb-6 group">
          <FileInputField
            type="file"
            name="studentImage"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangeFile}
            label="Choose Photo"
          />

        </div>
        <SubmitBtn
          label="Submit"
          type="submit"
        />
      </form>
    </>
  );
}

export default Student_details;
