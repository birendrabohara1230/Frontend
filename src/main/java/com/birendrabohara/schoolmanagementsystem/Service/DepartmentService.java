package com.birendrabohara.schoolmanagementsystem.Service;

import com.birendrabohara.schoolmanagementsystem.Model.Department;
import com.birendrabohara.schoolmanagementsystem.Repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    public Department setDepartment(Department department){
        return departmentRepository.insert(department);
    }

    public List<Department> getAllDepartment() {
        return departmentRepository.findAll();
    }

    public String getDepartmentNameByDepartmentId(String departmentId){
        Department department = departmentRepository.findById(departmentId);
        return department.getDepartmentName();
    }
}
