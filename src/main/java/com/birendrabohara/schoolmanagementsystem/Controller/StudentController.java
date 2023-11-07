package com.birendrabohara.schoolmanagementsystem.Controller;

import com.birendrabohara.schoolmanagementsystem.Model.Department;
import com.birendrabohara.schoolmanagementsystem.Model.StudentProfile;
import com.birendrabohara.schoolmanagementsystem.Service.DepartmentService;
import com.birendrabohara.schoolmanagementsystem.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    private MultipartFile file;
    @Value("${upload-dir}")
    private String imageUrl;
    @Autowired
    private StudentService studentService;

    @Autowired
    private DepartmentService departmentService;
    @PostMapping("/add")
    public ResponseEntity<StudentProfile> createStudent(@RequestParam("rollNumber") String rollNumber,
                                                        @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName,
                                                        @RequestParam("fatherName") String fatherName, @RequestParam("motherName") String motherName,
                                                        @RequestParam("phoneNumber") String phoneNumber, @RequestParam("email") String email,
                                                        @RequestParam("address") String address, @RequestParam("dateOfBirth") String dateOfBirth,
                                                        @RequestParam("departmentId") String departmentId,
                                                        @RequestPart("studentImage") MultipartFile studentImage) throws IOException, ParseException {
        StudentProfile studentProfile = new StudentProfile();
        studentProfile.setRollNumber(rollNumber);
        studentProfile.setFirstName(firstName);
        studentProfile.setLastName(lastName);
        studentProfile.setFatherName(fatherName);
        studentProfile.setMotherName(motherName);
        studentProfile.setPhoneNumber(phoneNumber);
        studentProfile.setEmail(email);
        studentProfile.setAddress(address);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
        Date date = dateFormat.parse(dateOfBirth);
        studentProfile.setDateOfBirth(date);
        studentProfile.setDepartmentId(departmentId);
        String imagePath = imageUrl + File.separator + studentImage.getOriginalFilename();
        studentProfile.setImageUrl(studentImage.getOriginalFilename());
        return new ResponseEntity<>(studentService.createStudent(studentProfile, studentImage, imagePath), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentProfile>> getAllStudents(){
        List<StudentProfile> newStudentsList = new ArrayList<>();
        List<StudentProfile>  students = studentService.getAllStudent();
        List<Department> departments = departmentService.getAllDepartment();
        for (StudentProfile student: students){
            for(Department department: departments){
                if(student.getDepartmentId().equals(department.getId())){
                    student.setDepartmentId(department.getDepartmentName());
                    break;
                }
            }
            newStudentsList.add(student);
        }
        return new ResponseEntity<>(newStudentsList, HttpStatus.OK);
    }

    @GetMapping("/search/{rollNumber}")
    public ResponseEntity<Optional<StudentProfile>> getSingleStudent(@PathVariable Integer rollNumber){
        return new ResponseEntity<Optional<StudentProfile>>(studentService.getSingleStudent(rollNumber), HttpStatus.OK);
    }

    @PostMapping("/delete/{rollNumber}")
    public String deleteStudent(@PathVariable Integer rollNumber){
        studentService.deleteStudent(rollNumber);
        return "Student deleted successfully";
    }

    @GetMapping("/search/{stName}")
    public ResponseEntity<List<StudentProfile>> getStudentByfirstNameAndlastName(@PathVariable String stName){
        return new ResponseEntity<List<StudentProfile>>(studentService.getStudentUsingSubString(stName), HttpStatus.OK);
    }
}
