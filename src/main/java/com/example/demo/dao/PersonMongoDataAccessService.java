package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository ("mongoDao")
public class PersonMongoDataAccessService implements PersonDAO {

    private final PersonMongoDAO personRepository;

    public PersonMongoDataAccessService(PersonMongoDAO personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public int insertPerson(String personId, Person person) {

        personRepository.insert(new Person(personId, person.getName()));
        return 1;
    }

    @Override
    public List<Person> selectAllPeople() {
        return personRepository.findAll();
    }

    @Override
    public int deletePersonByID(String personId) {
      Optional<Person> person = selectPersonById(personId);
        if (person.isEmpty()){
            return 0;
        }
        personRepository.deleteById(personId);

        return 1;
    }

    @Override
    public int updatePersonByID(String personId, Person update) {
       return selectPersonById(personId).map(existingPerson ->{

            if (existingPerson.getPersonId().equals(personId)){
                personRepository.save(new Person(personId, update.getName()));
                return 1;
            }
            return 0;
        }).orElse(0);
    }

    @Override
    public Optional<Person> selectPersonById(String personId){
          return personRepository.findById(personId);
    }
}
