describe('visa appointment reschedule', () => {
  before(() => {
    cy.visit(
      'https://www.vfsvisaonline.com/Netherlands-Global-Online-Appointment_Zone2/AppScheduling/AppWelcome.aspx?P=G3qxulWAmVWRsH%2FxEkFBR6gfe5suhmmZeA7ZYr2rImw%3D',
    );
  });

  it('should reschedule the appointment', function () {
    cy.get('#plhMain_lnkReSchApp').click();

    cy.get('#plhMain_tbxWebRefNo').type(Cypress.env('referenceNo'));
    cy.get('#plhMain_tbxLastName').type(Cypress.env('lastName'));
    cy.get('#plhMain_tbxEmailID').type(Cypress.env('email'));

    cy.get('#plhMain_btnSubmit').click();

    cy.get('#plhMain_btnReSch').click();

    cy.get('#tdCalender').find('tr').eq(0).find('tr').find('td').eq(1).contains(Cypress.env('targetMonth'));
  });
});
