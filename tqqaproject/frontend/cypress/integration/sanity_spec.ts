import loginPage from '../support/page-models/login';
import dashboard from '../support/page-models/dashboard';
import mainMenu from '../support/page-models/main-menu';
import profile from '../support/page-models/profile';
import editProfile from '../support/page-models/editProfile';
import changePassword from '../support/page-models/changePassword';
import createUserPage from '../support/page-models/createUser';
import manageUser from '../support/page-models/manageUser';

const ADMIN_EMAIL = 'admin@tqqaproject.com';
const ADMIN_PASSWORD = 'changethis';
const LOGIN_URL = 'http://localhost/login';

describe('Sanity Test Suite', () => {
  it('Login as an super user,', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost/api/v1/login/access-token'
    }).as('get-tokens');

    cy.visit(LOGIN_URL);
    loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
    cy.wait('@get-tokens').then((res) => {
      assert.equal(res.response.statusCode, 200);
    });
  });

  describe('As a super user', () => {
    
    it('user can view profile', () => {
      cy.log('Verify that Dashboard is the first page displayed');
      mainMenu.toggleMenuUsingMenuIcon();
      cy.contains('.headline', 'Dashboard')
        .should('be.visible');
      dashboard.clickViewProfile();
      cy.contains('User Profile')
        .should('be.visible');
      profile.verifyProfileEmail(ADMIN_EMAIL);
    });

    it('user can edit own profile', () => {
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost/api/v1/users/me',
      }).as('edit-profile');

      mainMenu.toggleMenuUsingMenuIcon()
        .clickEditProfileMenuItem();
      cy.contains('.headline', 'Edit User Profile')
        .should('be.visible');
      editProfile.editProfile('Test TQ Admin', 'admin@tqqaproject.com');

      cy.wait('@edit-profile').then((xhr) => {
        assert.equal(xhr.response.statusCode, 500);
      });  
    });

    it('user can change password', () => {
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost/api/v1/users/me',
      }).as('edit-profile');

      profile.clickChangePassword();
      changePassword.changePassword('changethis');

      cy.wait('@edit-profile').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      }); 
      
      cy.contains('Profile successfully updated', {timeout: 10000});
    });

    it('user can create a new user', () => {
      cy.intercept({
        method: 'POST',
        url: 'http://localhost/api/v1/users/',
      }).as('create-user');

      cy.intercept({
        method: 'GET',
        url: 'http://localhost/api/v1/users/',
      }).as('get-users');

      mainMenu.toggleMenuUsingMenuIcon()
        .clickCreateUserMenuItem();
      cy.wait('@get-users');

      const EMAIL_NEW_USER = 'test' + Date.now() +'@test.com';
      createUserPage.createUser({fullName: 'Test', email: EMAIL_NEW_USER, isSuperUser: false, password: 'P@ssw0rd'});

      cy.wait('@create-user').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
    });

    it('user can edit the newly created user', () => {
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost/api/v1/users/*'
      }).as('edit-user');

      manageUser.clickEditUser('test@test.com')
        .editUserFullName('Test Name');

      cy.wait('@edit-user').then((xhr) => {
        assert.equal(xhr.response.statusCode, 500);
      });
    });

    it('Logout as the super user', () => {
      mainMenu.toggleMenuUsingMenuIcon()
        .clickLogoutMenuItem();
    });

    it('Login as the newly created user', () => {
      cy.intercept({
        method: 'POST',
        url: 'http://localhost/api/v1/login/access-token'
      }).as('get-tokens');

      loginPage.login('test1@test.com', 'P@ssw0rd');

      cy.wait('@get-tokens').then((res) => {
        assert.equal(res.response.statusCode, 200);
      });
    });
  });

  describe('As a non super user,', () => {

    it('create user option is not avilable', () => {
      cy.contains('Create User')
        .should('not.be.visible');
    });

    it('view profile is available', () => {
      cy.contains('View Profile')
        .should('be.visible');
    });

    it('edit profile is available', () => {
      cy.contains('Edit Profile')
        .should('be.visible');
    });

    it('change password is available', () => {
      cy.contains('Change Password')
        .should('be.visible');
    });
  });
})