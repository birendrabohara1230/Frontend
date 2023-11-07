package com.birendrabohara.schoolmanagementsystem.Service;

import com.birendrabohara.schoolmanagementsystem.Model.CounterVariable;
import com.birendrabohara.schoolmanagementsystem.Model.Department;
import com.birendrabohara.schoolmanagementsystem.Repository.CounterVariableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CounterVariableService {
    @Autowired
    private CounterVariableRepository counterVariableRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public CounterVariable setCounter(CounterVariable counterVariable){
        return counterVariableRepository.insert(counterVariable);
    }

    public void updateCounter(String departmentCounter, String studentCounter, String bookCounter, String oldCounter, String toBeUpdated){
        Query query = new Query(Criteria.where(toBeUpdated).is(oldCounter));
        Update update = new Update();
        update.set("departmentCounter", departmentCounter);
        update.set("studentCounter", studentCounter);
        update.set("bookCounter", bookCounter);
        mongoTemplate.updateFirst(query, update, CounterVariable.class);
    }

    public List<CounterVariable> getCounters(){
        return counterVariableRepository.findAll();
    }
}
