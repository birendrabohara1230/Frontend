package com.birendrabohara.schoolmanagementsystem.Repository;

import com.birendrabohara.schoolmanagementsystem.Model.CounterVariable;
import com.birendrabohara.schoolmanagementsystem.Model.Department;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounterVariableRepository extends MongoRepository<CounterVariable, String> {

}
