/// <reference types="cypress" />

const { format } = require("date-fns");

describe('coder push note', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });

    it('should have nav bar', () => {
        cy.get('nav.main-nav').should('have.length', 1);
    });

    it('should have left side menu', () => {
        cy.get('div.left-menu').should('have.length', 1);
    });

    it('left side menu should have default text if empty', () => {
        cy.get('div.left-menu p.empty-text').should('have.text', 'Leave the memorization to me');
    });

    it('should have 4 action buttons', () => {
        cy.get('nav.list-action').should('have.length', 1);
        cy.get('nav.list-action').children().should('have.length', 4);
        cy.get('nav.list-action button').should((btns) => {
            // should have found 3 elements
            expect(btns).to.have.length(4)

            // use jquery's map to grab all of their classes
            // jquery's map returns a new jquery object
            const titles = btns.map((i, el) => {
                return Cypress.$(el).attr('title')
            })

            expect(titles.get()).to.deep.eq([
                'show as list',
                'show as gallery',
                'delete',
                'add a new note',
            ])
        })
    });

    it('button new behavior should working as expected', () => {
        cy.get('nav.list-action button:last-child').should('have.attr', 'title', 'add a new note').click();
        const today = new Date();

        cy.get('#editor').should('have.length', 1);
        cy.get('div.left-menu div.cursor-pointer').should('have.length', 1);

        cy.get('div.left-menu div.cursor-pointer div.note-title p').should('have.length', 2);
        cy.get('div.left-menu div.cursor-pointer div.note-title p').first().should('have.text', 'New Note');
        const txtToday = format(today, 'dd/MM/yyyy');
        cy.get('div.left-menu div.cursor-pointer div.note-title p').last().should('have.text', ` - ${txtToday}`);
        
        cy.get('div.left-menu div.cursor-pointer p.note-desc span').should('have.length', 2);
        const txtTodayTime = format(today, "hh:mm aaaaa'm'");
        cy.get('div.left-menu div.cursor-pointer p.note-desc span').first().should('have.text', txtTodayTime);
        cy.get('div.left-menu div.cursor-pointer p.note-desc span').last().should('have.text', `No additional text`);
    });
})