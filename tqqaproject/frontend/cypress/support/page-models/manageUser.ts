import { find } from "cypress/types/lodash";

class ManageUser {

  readonly FULL_NAME_CSS = '[aria-label="Full Name"]';
  readonly EMAIL_CSS ='[data-vv-name="email"]';
  readonly IS_SUPERUSER_CSS = '[aria-label="Is Superuser"]';
  readonly PASSWORD_CSS ='[data-vv-name="password"]';
  readonly VERIFY_PASSWORD_CSS ='[data-vv-name="password_confirmation"]';
  readonly BTN_CONTENT_CLASS = '.v-btn__content';

  clickCreateUser(){
    // Click create user button
    return this;
  }

  clickEditUser(email: string) {
    cy.contains(email)
      .parents('tr')
      .contains('.v-icon', 'edit')
      .click();
    return this; 
  }

  // Edit User page
  editUserFullName(fullName: string){
    cy.get(this.FULL_NAME_CSS)
      .clear()
      .type(fullName);
    cy.contains(this.BTN_CONTENT_CLASS, 'Save')
      .click();
    return this;
  }

  editUserDetails() {
    // Edit all the details
    return this;
  }
  
}
export default new ManageUser();