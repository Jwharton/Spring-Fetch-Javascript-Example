package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document
public class Person {
    @Id
    private final String personId;
    @NotBlank
    private final String name;


    public Person(@JsonProperty("personId") String personId, @JsonProperty("name") String name) {
        this.personId = personId;
        this.name = name;
    }

    public String getPersonId() {
        return personId;
    }

    public String getName() {
        return name;
    }
}
