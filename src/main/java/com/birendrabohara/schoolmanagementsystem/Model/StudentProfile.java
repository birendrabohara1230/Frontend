package com.birendrabohara.schoolmanagementsystem.Model;


import com.birendrabohara.schoolmanagementsystem.Controller.DepartmentController;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;

@Document(collection = "student_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfile {
    @Id
    private String rollNumber;
    private String  firstName;
    private String  lastName;
    private String  fatherName;
    private String  motherName;
    private String  address;
    private String  email;
    private String  phoneNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    private String departmentId;   /* Reference to department collection */
    private String imageUrl;

}
