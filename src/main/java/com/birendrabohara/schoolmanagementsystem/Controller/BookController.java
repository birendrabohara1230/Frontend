package com.birendrabohara.schoolmanagementsystem.Controller;

import com.birendrabohara.schoolmanagementsystem.Model.BookProfile;
import com.birendrabohara.schoolmanagementsystem.Model.CounterVariable;
import com.birendrabohara.schoolmanagementsystem.Service.BookService;
import com.birendrabohara.schoolmanagementsystem.Service.CounterVariableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/book")
@CrossOrigin
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private CounterVariableService counterVariableService;

    @PostMapping("/add")
    public ResponseEntity<BookProfile> setBook(@RequestParam("numberOfBooks") Integer numberOfBooks,
                                               @RequestParam("bookName") String bookName,
                                               @RequestParam("authorName") String authorName,
                                               @RequestParam("departmentId") String departmentId,
                                               @RequestParam("reckNumber") String reckNumber,
                                               @RequestParam("entryDate") String entryDate
                                               ) throws ParseException {
        List<CounterVariable> counterVariable = counterVariableService.getCounters();
        CounterVariable counters = counterVariable.getFirst();
        String oldBookCounter = counters.getBookCounter();
        int counter = Integer.parseInt(oldBookCounter.substring(3));
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
        Date conEntryDate = dateFormat.parse(entryDate);
        for (int i = 1; i <= numberOfBooks ; i++) {
            BookProfile bookProfile = new BookProfile();
            counter++;
            bookProfile.setBookCode("bk_no_" + String.valueOf(counter));
            bookProfile.setBookName(bookName);
            bookProfile.setAuthorName(authorName);
            bookProfile.setReckNumber(reckNumber);
            bookProfile.setEntryDate(conEntryDate);
            bookProfile.setDepartmentId(departmentId);
            bookService.setBook(bookProfile);
        }
        counters.setBookCounter("bk_" + String.valueOf(counter));
        counterVariableService.updateCounter(counters.getDepartmentCounter(), counters.getStudentCounter(), counters.getBookCounter(), oldBookCounter, "bookCounter");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /*Fetching all the books from database*/
    @GetMapping("/all")
    public ResponseEntity<List<BookProfile>>  getAllBooks(){
        return new ResponseEntity<>(bookService.getAllBooks(), HttpStatus.OK);
    }


    /* Variables for search criteria */
    private boolean BookCode = false;
    private boolean BookName = false;
    private boolean AuthorName = false;
    private boolean DepartmentName = false;
    private boolean ReckNumber = false;

    @PostMapping("/searchParams")
    private void getSearchParams(@RequestParam("isBookCode") boolean isBookCode,
                                 @RequestParam("isBookName") boolean isBookName,
                                 @RequestParam("isAuthorName") boolean isAuthorName,
                                 @RequestParam("isDepartmentName") boolean isDepartmentName,
                                 @RequestParam("isReckNumber") boolean isReckNumber){
        BookCode = isBookCode;
        BookName = isBookName;
        AuthorName = isAuthorName;
        DepartmentName = isDepartmentName;
        ReckNumber = isReckNumber;
    }





    /*Book Search Functionality */
    @GetMapping("/searchbook/{toBeSearchText}")
    public  ResponseEntity<Set<BookProfile>> searchBook(@PathVariable String toBeSearchText){
        return new ResponseEntity<Set<BookProfile>>(bookService.searchBook(toBeSearchText, BookCode, BookName, AuthorName, DepartmentName, ReckNumber), HttpStatus.OK);
    }

}
