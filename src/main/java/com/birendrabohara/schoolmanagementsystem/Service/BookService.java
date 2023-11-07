package com.birendrabohara.schoolmanagementsystem.Service;

import com.birendrabohara.schoolmanagementsystem.Model.BookProfile;
import com.birendrabohara.schoolmanagementsystem.Model.Department;
import com.birendrabohara.schoolmanagementsystem.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private DepartmentService departmentService;
    public BookProfile setBook(BookProfile bookProfile){
        return  (bookRepository.insert(bookProfile));
    }

    public List<BookProfile> getAllBooks(){
        List<BookProfile> newBooksList = new ArrayList<>();
        List<BookProfile> books = bookRepository.findAll();
        for (BookProfile book: books){
            String departmentId = book.getDepartmentId();
            book.setDepartmentId(departmentService.getDepartmentNameByDepartmentId(departmentId));
            newBooksList.add(book);
        }
        return newBooksList;
    }

    /* Book Searching Functionality*/
    public Set<BookProfile> searchBook(String toBeSearchText, boolean booCode, boolean bookName, boolean authorName, boolean departmentName, boolean reckNumber){
        Set<BookProfile> bookAccumulator = new HashSet<>();
        List<BookProfile> bookProfiles = new ArrayList<>();
        Set<BookProfile> booksListWithDepartmentName = new HashSet<>();
        if(booCode){
        bookProfiles = bookRepository.findByBookCode(toBeSearchText);
            if(!bookProfiles.isEmpty()){
                bookAccumulator.addAll(bookProfiles);
            }
        }
        if(bookName) {
            bookProfiles = bookRepository.findByBookName(toBeSearchText);
            if (!bookProfiles.isEmpty()) {
                bookAccumulator.addAll(bookProfiles);
            }
        }

        if(authorName) {
            bookProfiles = bookRepository.findByAuthorName(toBeSearchText);
            if (!bookProfiles.isEmpty()) {
                bookAccumulator.addAll(bookProfiles);
            }
        }

        if(departmentName) {
            bookProfiles = bookRepository.findByDepartmentId(toBeSearchText);
            if (!bookProfiles.isEmpty()) {
                bookAccumulator.addAll(bookProfiles);
            }
        }

        if(reckNumber) {
            bookProfiles = bookRepository.findByReckNumber(toBeSearchText);
            if (!bookProfiles.isEmpty()) {
                bookAccumulator.addAll(bookProfiles);
            }
        }

        if(!bookAccumulator.isEmpty()){
            List<Department> departments = departmentService.getAllDepartment();
            for(BookProfile book: bookAccumulator){
                for(Department department: departments){
                    if(book.getDepartmentId().equals(department.getId())){
                        book.setDepartmentId(department.getDepartmentName());
                    }
                }
                booksListWithDepartmentName.add(book);
            }
        }
        return booksListWithDepartmentName;
    }
}
