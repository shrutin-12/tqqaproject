class Profile {

  clickEditProfile() {
    cy.contains('.v-btn__content', 'Edit')
      .click();
    return this;
  }

  clickChangePassword() {
    cy.contains('.v-btn__content', 'Change password')
      .click();
    return this;
  }

  verifyProfileEmail(email: string){
    cy.get('.v-card__text')
      .contains('Email')
      .siblings('.title')
      .should('have.text', email);
    return this;
  }

  verifyProfileFullName(fullName: string) {
    cy.get('.v-card__text')
      .contains('Full Name')
      .siblings('.title')
      .should('have.text', fullName);
    return this;
  }
}
export default new Profile();