package com.birendrabohara.schoolmanagementsystem.Repository;

import com.birendrabohara.schoolmanagementsystem.Model.Department;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends MongoRepository<Department, ObjectId> {
   Department findByDepartmentName(String department_name);

    Department findById(String departmentId);
}
