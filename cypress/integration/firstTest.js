/// <reference types="cypress" />

const { waitForDebugger } = require("inspector")

describe('First Test', () => {

  before(() => {
    cy.visit('https://octo-accp.mendixcloud.com/')
    cy.on('uncaught:exception', (e, runnable) => {
      console.log('error', e)
      console.log('runnable', runnable)

      if (e.message.includes('window.location.includes is not a function')) {
        // we expected this error, so let's ignore it
        // and let the test continue
        return false
      }
    })
  })

  beforeEach(() => {
    cy.on('uncaught:exception', (e, runnable) => {
      console.log('error', e)
      console.log('runnable', runnable)

      if (e.message.includes('window.location.includes is not a function')) {
        // we expected this error, so let's ignore it
        // and let the test continue
        return false
      }
    })
  })
  
  it('Type Username, Password and click Login', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')

    // it is ok for the username to be visible in the Command Log
    expect(username, 'username was set').to.be.a('string').and.not.be.empty
    // but the password value should not be shown
    if (typeof password !== 'string' || !password) {
      throw new Error('Missing password value, set using CYPRESS_password=...')
    }

    cy.get('[name=username]').type(username)
    cy.get('[name=password]').type(password, {log: false}) //do not log password
    cy.get('[type=submit]').click()

    cy.wait(7000)
    cy.get('#mxui_widget_DataView_2').click(390, 250)
    cy.wait(5000)
    cy.get('#mxui_widget_DataView_2').click(185, 240)
    cy.wait(5000)
    cy.get('.item-enter-done').first().click()
    
    cy.get('#mxui_widget_ListView_2').find('li').should('not.have.class', 'mx-listview-empty')
  })
})
