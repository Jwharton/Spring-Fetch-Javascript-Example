package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository ("fakeDao")
public class FakePersonDataAccessService implements PersonDAO {

    private static List<Person> DB = new ArrayList<>();

    @Override
    public int insertPerson(String personId, Person person) {
        DB.add(new Person(personId, person.getName()));
        return 1;
    }

    @Override
    public List<Person> selectAllPeople() {
        return DB;
    }

    @Override
    public int deletePersonByID(String personId) {
        Optional<Person> person = selectPersonById(personId);
        if (person.isEmpty()){
            return 0;
        }
        DB.remove(person.get());
        return 1;
    }

    @Override
    public int updatePersonByID(String personId, Person update) {
        return selectPersonById(personId).map(existingPerson ->{
            int indexOfPersonToUpdate = DB.indexOf(existingPerson);
            if (indexOfPersonToUpdate >=0){
                DB.set(indexOfPersonToUpdate, new Person(personId, update.getName()));
                return 1;
            }
            return 0;
        }).orElse(0);
    }

    @Override
    public Optional<Person> selectPersonById(String personId){
        return DB.stream().filter(person -> person.getPersonId().equals(personId)).findFirst();
    }
}
