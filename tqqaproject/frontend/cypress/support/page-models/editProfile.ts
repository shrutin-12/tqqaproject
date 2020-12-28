class EditProfile {

  readonly FULL_NAME_CSS = '[aria-label="Full Name"]';
  readonly EMAIL_CSS = '[data-vv-name="email"]';
  readonly BTN_CONTENT_CLASS = '.v-btn__content';

  cancelEditProfile() {
    cy.contains(this.BTN_CONTENT_CLASS,'Cancel')
      .click();
    return this;
  }

  resetEditProfile() {
    cy.contains(this.BTN_CONTENT_CLASS,'Reset')
      .click();
    return this;
  }

  editProfile(fullName: string, email: string) {
    cy.get(this.FULL_NAME_CSS)
      .clear()
      .type(fullName);

    cy.get(this.EMAIL_CSS)
      .clear()
      .type(email);

    cy.contains(this.BTN_CONTENT_CLASS, 'Save')
      .click();

    return this;
  }
}
export default new EditProfile();