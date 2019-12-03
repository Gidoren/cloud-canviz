'use strict' 
 
const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = require("../src/schema.js");
 
const tester = new EasyGraphQLTester(schemaCode)

describe('Test my queries, mutations', () => {
   
    describe('Should pass if the query is invalid, when given an invalid field. '
    + 'Query should pass if given all valid fields.', () => {
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
   
      it('Should pass if the getAllUsers query is valid', () => {
        const validQuery = `
          {
            getAllUsers {
              email
            }
          }
        `
        tester.test(true, validQuery)
      })

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
   
      it('Should pass if the getUser query is valid', () => {
        const validQuery = `
          {
            getUser {
              email
            }
          }
        `
        tester.test(true, validQuery)
      })
      
      it('Invalid query currentUser', () => {
        const invalidQuery = `
          {
            currentUser {
              id
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, invalidQuery)
      })
   
      it('Should pass if the currentUser query is valid', () => {
        const validQuery = `
          {
            currentUser {
              email
            }
          }
        `
        tester.test(true, validQuery)
      })

      it('Should pass if the createContact mutation is valid', () => {
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
   
      it('Should not pass if one value on the createContact mutation input is invalid', () => {
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

      it('Should pass if the registerUser mutation is valid', () => {
        const mutation = `
          mutation registerUser($userInput: UserInput) {
            registerUser(userInput: $userInput) {
              firstName
            }
          }
        `
        tester.test(true, mutation, {
          registerUser: {
            firstName: "test"
          }
        })
      })
   
      it('Should not pass if one value on the registerUser mutation input is invalid', () => {
        const mutation = `
          mutation registerUser($userInput: UserInput) {
            registerUser(userInput: $userInput) {
              firstName
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
          registerUser: {
            firstName: "test",
            invalidField: "oof"
          }
        })
      })

      it('Should pass if the deleteContact mutation is valid', () => {
        const mutation = `
          mutation deleteContact($contactID: String) {
            deleteContact(contactID: $contactID) {
              _id
            }
          }
        `
        tester.test(true, mutation, {
          deleteContact: {
            contactID: 1
          }
        })
      })
   
      it('Should not pass if one value on the deleteContact mutation input is invalid', () => {
        const mutation = `
          mutation deleteContact($contactID: String) {
            deleteContact(contactID: $contactID) {
              _id
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
          deleteContact: {
            contactID: 1,
            invalidField: "test"
          }
        })
      })

      it('Should pass if the removeArt mutation is valid', () => {
        const mutation = `
          mutation removeArt($artId: String) {
            removeArt(artId: $artId) {
              _id
            }
          }
        `
        tester.test(true, mutation, {
          removeArt: {
            artId: 1
          }
        })
      })
   
      it('Should not pass if one value on the removeArt mutation input is invalid', () => {
        const mutation = `
          mutation removeArt($artId: String) {
            removeArt(artId: $artId) {
              _id
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
          removeArt: {
            artId: 1,
            invalidField: "test"
          }
        })
      })

      it('Should pass if the createArt mutation is valid', () => {
        const mutation = `
          mutation createArt($artInput: ArtInput) {
            createArt(artInput: $artInput) {
              _id
            }
          }
        `
        tester.test(true, mutation, {
          createArt: {
            artId: 1
          }
        })
      })
   
      it('Should not pass if one value on the createArt mutation input is invalid', () => {
        const mutation = `
          mutation createArt($artInput: ArtInput) {
            createArt(artInput: $artInput) {
              _id
              invalidField
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
          createArt: {
            artId: 1,
            invalidField: "test"
          }
        })
      })
      
      
      it('Should pass if the likeArt mutation is valid', () => {
        const mutation = `
          mutation likeArt($artId: String) {
            likeArt(artId: $artId) {
              artist
            }
          }
        `
        tester.test(true, mutation, {
          likeArt: {
            artist: "test"
          }
        })
      })
   
      it('Should not pass if one value on the likeArt mutation input is invalid', () => {
        const mutation = `
          mutation likeArt($artId: String) {
            likeArt(artId: $artId) {
              firstName
              lastName
              phone_number
              email
            }
          }
        `
        // First arg: false, there is no invalidField on the schema.
        tester.test(false, mutation, {
            likeArt: {
                firstName: "unittest",
                invalidField: "testinvalidfield",
                lastName: "lastname",
                phone_number: "555-555-5555",
                email: "unit@test.com"
            }
        })
      })
    })
  })