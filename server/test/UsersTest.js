'use strict' 
 
const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = require("../src/schema.js");
 
const tester = new EasyGraphQLTester(schemaCode)

describe('Test my queries, mutations', () => {
   
    describe('Should pass if the query is invalid', () => {
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
    })
  })