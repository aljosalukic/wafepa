package jwd.wafepa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jwd.wafepa.model.Activity;
import jwd.wafepa.model.User;

@Repository
public interface UserRepository 
	extends PagingAndSortingRepository<User, Long> {

//@Query("select u from User u where u.first_name = :name")
//List<User> findByName(@Param("name") String name);
	
	
}
