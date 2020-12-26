class ChangePassword {

  readonly PASSWORD_CSS = '[data-vv-name="password"]';
  readonly VERIFY_PASSWORD_CSS = '[data-vv-name="password_confirmation"]';
  readonly BTN_CONTENT_CLASS = '.v-btn__content';

  cancelChangePassword() {
    // click cancel button
    return this;
  }

  resetChangePassword() {
    // click reset button
    return this;
  }

  changePassword(password: string) {
    cy.get(this.PASSWORD_CSS)
      .clear()
      .type(password);
    cy.get(this.VERIFY_PASSWORD_CSS)
      .clear()
      .type(password);
    cy.contains(this.BTN_CONTENT_CLASS, 'Save')
      .click();
    return this;
  }
}
export default new ChangePassword();