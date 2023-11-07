package com.birendrabohara.schoolmanagementsystem.Repository;

import com.birendrabohara.schoolmanagementsystem.Model.BookProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<BookProfile, Integer> {
    @Query("{$or: [{'bookCode': {$regex: ?0, $options: 'i'}}]}")
    List<BookProfile> findByBookCode(String toBeSearchText);

    @Query("{$or: [{'bookName': {$regex: ?0, $options: 'i'}}]}")
    List<BookProfile> findByBookName(String toBeSearchText);

    @Query("{$or: [{'authorName': {$regex: ?0, $options: 'i'}}]}")
    List<BookProfile> findByAuthorName(String toBeSearchText);

    @Query("{$or: [{'departmentId': {$regex: ?0, $options: 'i'}}]}")
    List<BookProfile> findByDepartmentId(String toBeSearchText);

    @Query("{$or: [{'reckNumber': {$regex: ?0, $options: 'i'}}]}")
    List<BookProfile> findByReckNumber(String toBeSearchText);
}
