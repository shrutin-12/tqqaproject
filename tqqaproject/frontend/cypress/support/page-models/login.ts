class Login {
  readonly BTN_CONTENT_CLASS = '.v-btn__content';
  readonly BTN_CLASS = '.v-btn';
  readonly FORGOT_PASSWORD_USERNAME_CSS = '[data-vv-name="username"]';
  readonly LOGIN_PASSWORD_ID = '#password';
  readonly LOGIN_EMAIL_CSS = 'input[name="login"]';


  login(email: string, password: string) {
    cy.get(this.LOGIN_EMAIL_CSS)
      .type(email);
    cy.get(this.LOGIN_PASSWORD_ID)
      .type(password);
    cy.contains(this.BTN_CLASS, 'Login')
      .click();
    return this;
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?')
      .click();
    return this;
  }

  // Forgot Password page
  forgotPassword(email: string) {
    cy.get(this.FORGOT_PASSWORD_USERNAME_CSS)
      .type(email);
    cy.contains(this.BTN_CONTENT_CLASS, ' Recover Password ')
      .click();
    return this;
  }

  cancelForgotPassword() {
    cy.contains(this.BTN_CONTENT_CLASS, 'Cancel')
      .click();
    return this;
  }
}

export default new Login();