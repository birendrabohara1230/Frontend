package com.birendrabohara.schoolmanagementsystem.Repository;

import com.birendrabohara.schoolmanagementsystem.Model.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<StudentProfile, Integer> {
    Optional<StudentProfile> findByRollNumber(Integer rollNumber);


    @Query("{$or: [{'firstName': {$regex: ?0, $options: 'i'}}, {'lastName': {$regex: ?0, $options: 'i'}}]}")
    List<StudentProfile> findByFirstNameOrLastNameContainingIgnoreCase(String name);
}
