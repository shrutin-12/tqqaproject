import loginPage from '../support/page-models/login'
import mainMenu from '../support/page-models/main-menu'
import createUserPage from '../support/page-models/createUser'
import manageUser from '../support/page-models/manageUser'

describe('Manage User suite', () => {
  it('Login as a superuser', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost/api/v1/login/access-token'
    }).as('get-tokens');

    cy.visit('http://localhost/login');
    loginPage.login('admin@tqqaproject.com', 'changethis');

    cy.wait('@get-tokens').then((res) => {
      assert.equal(res.response.statusCode, 200);
    });
  });

  describe('As a super user', () => {
    it('on create user, invalid email shows error', () => {
      mainMenu.clickManageUsersMenuItem();
      cy.contains('Manage Users');
      manageUser.clickCreateUser();
      cy.get(createUserPage.EMAIL_CSS)
        .type('abc');
      cy.contains('The email field must be a valid email')
        .should('be.visible');
    });

    it('save button is disabled until all required fields are filled', () => {

    });

    it('can create a new user', () => {
      cy.intercept({
        method: 'POST',
        url: 'http://localhost/api/v1/users/'
      }).as('create-user');

      createUserPage.createUser({
        fullName: 'Test User',
        email: 'test' + Date.now() + '@test.com',
        isSuperUser: false,
        password: 'test123'
      });

      cy.wait('@create-user').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
    });
  
    it('can see list of existing user', () => {
      mainMenu.toggleMenuUsingMenuIcon()
        .clickManageUsersMenuItem();
      cy.wait(500);
      cy.contains('test@test.com')
        .should('be.visible');
    });
  
    it('can edit an existing user detail', () => {
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost/api/v1/users/*'
      }).as('update-user');

      manageUser.clickEditUser('test@test.com');
      cy.contains('Edit User')
        .should('be.visible');
      manageUser.editUserFullName('Edited Full Name');
      cy.wait('@update-user').then((xhr) => {
        assert.equal(xhr.response.statusCode, 200);
      });
    });
  
    it('can inactivate an existing user', () => {
      cy.contains('User successfully created', {timeout:5000});
      cy.intercept({
        method: 'GET',
        url: 'http://localhost/api/v1/users/'
      }).as('get-users');
      manageUser.clickEditUser('test@test.com');
      cy.contains('Edit User')
        .should('be.visible');
      manageUser.toggleUserActiveStatus();
      cy.wait('@get-users');
    });
  
    it('can activate an inactive user', () => {
      // activate the above user
    });
  
    it('can set another user as super user', () => {
      // set a user as super user
    });
  
    it('user can navigate to next page if required', () => {
      // navigate to next page
    });
  
    it('user can set rows per page displayed', () => {
      // set to show all records on the page
    });

    it('manage user table shows check mark agianst the active users', () => {
      // verify the check element exist for an active user
      // verify the check element does not exist for an inactive user
    });

    it('manage user table shows check mark agianst the super users', () => {
        // verify the check element exist for a super user
        // verify the check element does not exist for a non-super user
    });
  });
});