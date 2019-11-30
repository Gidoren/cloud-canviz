'use strict' 
 
const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = require("../src/schema.js");
 
const tester = new EasyGraphQLTester(schemaCode)

describe('Test my queries, mutations', () => {
   
    describe('Should pass if the query is invalid', () => {
      //getAllUsers test
      it('Invalid query getAllUsers', () => {
        const invalidQuery = `
          {
            getAllUsers {
              id
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, invalidQuery)
      })
      ///getAllUsers test
      it('Should pass if the query is valid', () => {
        const validQuery = `
          {
            getAllUsers {
              email
            }
          }
        `
        tester.test(true, validQuery)
      })
      //getUser test
      it('Invalid query getUser', () => {
        const invalidQuery = `
          {
            getUser {
              id
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, invalidQuery)
      })
      //getUserContacts
      it('Should pass if the query is valid', () => {
        const validQuery = `
          {
            getUserContacts {
              firstName
              lastName
            }
          }
        `
        tester.test(true, validQuery)
      })
      //getUserContacts test
      it('Invalid query getUserContacts', () => {
        const invalidQuery = `
          {
            getUserContacts {
              firstname
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, invalidQuery)
      })
      //currentUser test
      it('Should pass if the query is valid', () => {
        const validQuery = `
          {
            currentUser {
              email
              password
            }
          }
        `
        tester.test(true, validQuery)
      })
      //currentUserntest
      it('Invalid query currentUser', () => {
        const invalidQuery = `
          {
            currentUser {
              Email
              password
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, invalidQuery)
      })
      //getUser test
      it('Should pass if the query is valid', () => {
        const validQuery = `
          {
            getUser {
              username
            }
          }
        `
        tester.test(true, validQuery)
      })
      
      //createContact test
      it('Should pass if the mutation is valid', () => {
        const mutation = `
          mutation createContact($contactInput: ContactInput) {
            createContact(contactInput: $contactInput) {
              firstName
              lastName
              phone_number
              email
            }
          }
        `
        tester.test(true, mutation, {
          contactInput: {
            firstName: "unittest",
            lastName: "lastname",
            phone_number: "555-555-5555",
            email: "unit@test.com"
          }
        })
      })
      //createcontact test if invalid then pass
      it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation createContact($contactInput: ContactInput) {
            createContact(contactInput: $contactInput) {
              firstName
              lastName
              phone_number
              email
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            contactInput: {
                firstName: "unittest",
                invalidField: "testinvalidfield",
                lastName: "lastname",
                phone_number: "555-555-5555",
                email: "unit@test.com"
            }
        })
      })
      //registerUser test
      it('Should pass if the mutation is valid', () => {
        const mutation = `
          mutation registerUser($userInput: UserInput) {
            registerUser(userInput: $userInput) {
              firstName
              lastName
              email
              password
            }
          }
        `
        tester.test(true, mutation, {
          contactInput: {
            firstName: "unittest",
            lastName: "lastname",
            email: "unit@test.com",
            password: "123"
          }
        })
      })
      //registerUser test
      it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation registerUser($userInput: UserInput) {
          registerUser(userInput: $userInput) {
              firstName
              lastNameuserInput
              phone_number
              email
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            contactInput: {
                firstName: "unittest",
                invalidField: "testinvalidfield",
                lastName: "lastname",
                phone_number: "555-555-5555",
                email: "unit@test.com"
            }
        })
      })
      //deleteContact test
      it('Should pass if the mutation is valid', () => {
        const mutation = `
          mutation deleteContact($contactID: String) {
            deleteContact(contactID: $contactID) {
              _id
            }
          }
        `
        tester.test(true, mutation, {
          String: {
            _id: 'test'
          }
        })
      })
      //deleteContact test
      it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation deleteContact($contactID: String) {
            deleteContact(contactID: $contactID) {
              
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            String: {
            }
        })
      })
       //deleteContact test
      it('Should pass if the mutation is valid', () => {
        const mutation = `
          mutation deleteContact($contactID: String) {
            deleteContact(contactID: $contactID) {
              _id
            }
          }
        `
        tester.test(true, mutation, {
          String: {
            _id: 'test'
          }
        })
      })
      //deleteContact test
      it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation deleteContact($contactID: String) {
            deleteContact(contactID: $contactID) {
              
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            String: {
            }
        })
      })
       //removeArt test
       it('Should pass if the mutation is valid', () => {
        const mutation = `
          mutation removeArt($artId: String) {
            removeArt(artId: $artId) {
              _id
            }
          }
        `
        tester.test(true, mutation, {
          String: {
            _id: 'test'
          }
        })
      })
      //removeArt test
      it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation removeArt($artId: String) {
            removeArt(artID: $artId) {
              
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            String: {
            }
        })
      })
      //likeArt test
      it('Should pass if the mutation is valid', () => {
        const mutation = `
          mutation likeArt($artId: String) {
            likeArt(artId: $artId) {
              _id
            }
          }
        `
        tester.test(true, mutation, {
          String: {
            _id: 'test'
          }
        })
      })
      //likeArt test
      it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation likeArt($artId: String) {
          likeArt(artID: $artId) {
              
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            String: {
            }
        })
      })
      //createArt test
      it('Should pass if the mutation is valid', () => {
        const mutation = `
        mutation createArt($artInput: ArtInput) {
          createArt(artInput: $artInput) {
              artist
            }
          }
        `
        tester.test(true, mutation, {
          String: {
            artist: 'david'
          }
        })
      })
      //createArt test
      it('Should not pass if one value on the mutation input is invalid', () => {
        const mutation = `
        mutation createArt($artInput: ArtInput) {
          createArt(artInput: $artInput) {
              
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            String: {
            }
        })
      })
    })
  })
