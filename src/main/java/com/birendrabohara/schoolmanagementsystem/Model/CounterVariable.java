package com.birendrabohara.schoolmanagementsystem.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Counter")
public class CounterVariable {
    private String departmentCounter;
    private String studentCounter;
    private String bookCounter;
}
