package com.birendrabohara.schoolmanagementsystem.Controller;


import com.birendrabohara.schoolmanagementsystem.Model.CounterVariable;
import com.birendrabohara.schoolmanagementsystem.Model.Department;
import com.birendrabohara.schoolmanagementsystem.Service.CounterVariableService;
import com.birendrabohara.schoolmanagementsystem.Service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/department")
@CrossOrigin
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private CounterVariableService counterVariableService;



    // Inserting department into department document
    @PostMapping("/add")
    public ResponseEntity<Department> setDepartment(@RequestBody Department department){
        List<CounterVariable> counterVariable = counterVariableService.getCounters();
        if(counterVariable.isEmpty()){
            CounterVariable counters = new CounterVariable();
            department.setId("dpt_1");
            counters.setDepartmentCounter("dpt_1");
            counters.setStudentCounter("dpt_0");
            counters.setBookCounter("dpt_0");
            counterVariableService.setCounter(counters);
        }else{
            CounterVariable counters = counterVariable.getFirst();
            String oldDepartmentCounter = counters.getDepartmentCounter();
            int counter = Integer.parseInt(oldDepartmentCounter.substring(4));
            counter++;
            String newDepartmentId = "dpt_" + String.valueOf(counter);
            counters.setDepartmentCounter(newDepartmentId);
            department.setId(counters.getDepartmentCounter());
            counterVariableService.updateCounter(counters.getDepartmentCounter(), counters.getStudentCounter(), counters.getBookCounter(), oldDepartmentCounter, "departmentCounter");
        }
       return new ResponseEntity<>(departmentService.setDepartment(department), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Department>> getAllDepartment(){
        return new ResponseEntity<>(departmentService.getAllDepartment(), HttpStatus.OK);
    }

}
