class Profile {

  readonly BTN_CONTENT_CLASS = '.v-btn__content';
  readonly PROFILE_CARD_CLASS = '.v-card__text';
  readonly TITLE_CLASS = '.title';

  clickEditProfile() {
    cy.contains(this.BTN_CONTENT_CLASS, 'Edit')
      .click();
    return this;
  }

  clickChangePassword() {
    cy.contains(this.BTN_CONTENT_CLASS, 'Change password')
      .click();
    return this;
  }

  verifyProfileEmail(email: string){
    cy.get(this.PROFILE_CARD_CLASS)
      .contains('Email')
      .siblings(this.TITLE_CLASS)
      .should('have.text', email);
    return this;
  }

  verifyProfileFullName(fullName: string) {
    cy.get(this.PROFILE_CARD_CLASS)
      .contains('Full Name')
      .siblings(this.TITLE_CLASS)
      .should('have.text', fullName);
    return this;
  }
}
export default new Profile();