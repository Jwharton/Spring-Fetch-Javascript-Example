package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PersonMongoDAO extends MongoRepository<Person, String> {
}
