import loginPage from '../support/page-models/login'
import mainMenu from '../support/page-models/main-menu'
import dashboard from '../support/page-models/dashboard'
import profile from '../support/page-models/profile'
import editProfile from '../support/page-models/editProfile'
import changePassword from '../support/page-models/changePassword'

const NON_SUPER_EMAIL = 'june@test.com';
const NON_SUPER_FULLNAME = 'test';
const NON_SUPER_PASSWORD = 'P@ssw0rd';
const LOGIN_URL = 'http://localhost/login';

describe('Non Super User Profile suite', () => {
  it('Login as a non super user', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost/api/v1/login/access-token'
    }).as('get-tokens');

    cy.visit(LOGIN_URL);
    loginPage.login(NON_SUPER_EMAIL, NON_SUPER_PASSWORD);
    cy.wait('@get-tokens').then((res) => {
      assert.equal(res.response.statusCode, 200);
    });
  });
  describe('As a non super user', () => {
    it('can view the profile', () => {
      mainMenu.toggleMenuUsingMenuIcon();
      cy.contains('.headline', 'Dashboard')
        .should('be.visible');
      dashboard.clickViewProfile();
      cy.contains('User Profile')
        .should('be.visible');
    });

    it('correct email is displayed on the profile page', () => {
      profile.verifyProfileEmail(NON_SUPER_EMAIL);
    });

    it('correct full name should be displayed on the profile page', () => {
      profile.verifyProfileFullName(NON_SUPER_FULLNAME);
    });

    it('can navigate to edit profile page', () => {
      profile.clickEditProfile();
      cy.contains('.headline', 'Edit User Profile')
        .should('be.visible');
    });

    it('can reset changes made to profile', () => {
      cy.get(editProfile.FULL_NAME_CSS)
        .type('123');
      editProfile.resetEditProfile();
      cy.get(editProfile.FULL_NAME_CSS)
        .should('have.value', NON_SUPER_FULLNAME);
    });

    it('can cancel edit profile', () => {
      editProfile.cancelEditProfile();
      cy.contains('.headline', 'User Profile')
        .should('be.visible');
    });

    it('can save changes to profile', () => {
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost/api/v1/users/me',
      }).as('edit-profile');

      profile.clickEditProfile();
      cy.contains('.headline', 'Edit User Profile')
        .should('be.visible');
      editProfile.editProfile(NON_SUPER_FULLNAME, NON_SUPER_EMAIL);

      cy.wait('@edit-profile').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
    });

    it('can navigate to change password', () => {
      profile.clickChangePassword();
      cy.contains('.headline', 'Set Password')
        .should('be.visible');
    });

    it('clicking save without entering password throws error', () => {
      cy.contains(changePassword.BTN_CONTENT_CLASS, 'Save')
        .click();
      cy.contains('The password field is required')
        .should('be.visible');
    });

    it('can update the password', () => {
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost/api/v1/users/me',
      }).as('edit-profile');

      changePassword.changePassword('P@ssw0rd');
      cy.wait('@edit-profile').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
      cy.contains('Profile successfully updated', { timeout: 10000 });
    });
  });
});