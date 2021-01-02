package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository ("fakeDao")
public class FakePersonDataAccessService implements PersonDAO {

    private static List<Person> DB = new ArrayList<>();

    @Override
    public int insertPerson(UUID id, Person person) {
        DB.add(new Person(id, person.getName()));
        return 1;
    }

    @Override
    public List<Person> selectAllPeople() {
        return DB;
    }

    @Override
    public int deletePersonByID(UUID id) {
        Optional<Person> person = selectPersonById(id);
        if (person.isEmpty()){
            return 0;
        }
        DB.remove(person.get());
        return 1;
    }

    @Override
    public int updatePersonByID(UUID id, Person update) {
        return selectPersonById(id).map(existingPerson ->{
            int indexOfPersonToUpdate = DB.indexOf(existingPerson);
            if (indexOfPersonToUpdate >=0){
                DB.set(indexOfPersonToUpdate, new Person(id, update.getName()));
                return 1;
            }
            return 0;
        }).orElse(0);
    }

    @Override
    public Optional<Person> selectPersonById(UUID id) {
        return DB.stream().filter(person -> person.getId().equals(id)).findFirst();
    }
}
