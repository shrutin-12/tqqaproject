class Login {

  login(email: string, password: string) {
    cy.get('input[name="login"]')
      .type(email);

    cy.get('#password')
      .type(password);

    cy.contains('.v-btn','Login')
      .click();

    return this;
  }
  
  clickForgotPassword() {
    cy.contains('Forgot your password?')
      .click();
    return this;
  }

  forgotPassword(email: string) {
    cy.get('[data-vv-name="username"]')
      .type(email);
    cy.contains('.v-btn__content',' Recover Password ')
      .click();
    return this;
  }

  cancelForgotPassword() {
    cy.contains('.v-btn__content', 'Cancel')
      .click();
    return this;
  }
}

export default new Login();