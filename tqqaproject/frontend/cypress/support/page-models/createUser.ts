class CreateUser {

  readonly FULL_NAME_CSS = '[aria-label="Full Name"]';
  readonly EMAIL_CSS ='[data-vv-name="email"]';
  readonly IS_SUPERUSER_CSS = '[aria-label="Is Superuser"]';
  readonly PASSWORD_CSS ='[data-vv-name="password"]';
  readonly VERIFY_PASSWORD_CSS ='[data-vv-name="password_confirmation"]';
  readonly BTN_CONTENT_CLASS = '.v-btn__content';

  createUser({
    fullName,
    email,
    isSuperUser,
    password,
  }:{
    fullName: string,
    email: string,
    isSuperUser: boolean,
    password: string,
  }) {
    cy.get(this.FULL_NAME_CSS)
      .type(fullName);
    cy.get(this.EMAIL_CSS)
      .type(email);
    if(isSuperUser) {
      cy.get(this.IS_SUPERUSER_CSS)
        .click();
    }
    cy.get(this.PASSWORD_CSS)
      .type(password);
    cy.get(this.VERIFY_PASSWORD_CSS)
      .type(password);
    cy.contains(this.BTN_CONTENT_CLASS, 'Save')
      .click();
    return this;
  }
}
export default new CreateUser();