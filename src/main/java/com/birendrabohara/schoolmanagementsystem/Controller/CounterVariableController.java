package com.birendrabohara.schoolmanagementsystem.Controller;

import com.birendrabohara.schoolmanagementsystem.Model.CounterVariable;
import com.birendrabohara.schoolmanagementsystem.Service.CounterVariableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/counter")
public class CounterVariableController {

    @Autowired
    private CounterVariableService counterVariableService;

    @PostMapping("/add")
    public ResponseEntity<CounterVariable> setCounters(@RequestBody CounterVariable counterVariable){
        return new ResponseEntity<>(counterVariableService.setCounter(counterVariable), HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<CounterVariable> getCounters(){
        return counterVariableService.getCounters();
    }
}
