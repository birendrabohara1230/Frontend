package com.birendrabohara.schoolmanagementsystem.Service;

import com.birendrabohara.schoolmanagementsystem.Model.StudentProfile;
import com.birendrabohara.schoolmanagementsystem.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    /*Insert student to 'student_details' collection */
    public StudentProfile createStudent(StudentProfile studentProfile, MultipartFile file, String imagePath) throws IOException {
        file.transferTo(new File((imagePath)));
        return studentRepository.insert(studentProfile);
    }

    /* Find a single student using rollNumber */
    public Optional<StudentProfile> getSingleStudent(Integer rollNumber) {
        return studentRepository.findByRollNumber(rollNumber);
    }

    /* Deleting the student using rollNumber */
    public void deleteStudent(Integer rollNumber) {
        studentRepository.deleteById(rollNumber);
    }

    /*Getting all the student from 'student_details' collection */
    public List<StudentProfile> getAllStudent() {
        return studentRepository.findAll();
    }

    /* Searching a student using firstName and lastName subString */
        public List<StudentProfile> getStudentUsingSubString(String name){
        return studentRepository.findByFirstNameOrLastNameContainingIgnoreCase(name);
    }
}
