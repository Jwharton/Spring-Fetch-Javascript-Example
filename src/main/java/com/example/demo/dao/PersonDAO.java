package com.example.demo.dao;

import com.example.demo.model.Person;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PersonDAO {

    int insertPerson (String personId, Person person);

    default int insertPerson(Person person) {
        String personId = UUID.randomUUID().toString();
        return insertPerson(personId, person);
    }

    List<Person> selectAllPeople();

    int deletePersonByID(String personId);

    int updatePersonByID(String personId, Person person);

    Optional<Person> selectPersonById(String personId);

}
