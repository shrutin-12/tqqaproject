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
    it('Super user can create a new user', () => {
      cy.intercept({
        method: 'POST',
        url: 'http://localhost/api/v1/users/'
      }).as('create-user');

      mainMenu.clickCreateUserMenuItem();
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
  
    it('Super user can see list of existing user', () => {
      mainMenu.toggleMenuUsingMenuIcon()
        .clickManageUsersMenuItem();
      cy.wait(500);
      cy.contains('test@test.com')
        .should('be.visible');
    });
  
    it('Super user can edit an existing user detail', () => {
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost/api/v1/users/*'
      }).as('update-user');

      manageUser.clickEditUser('test@test.com');
      cy.contains('Edit User')
        .should('be.visible');
      manageUser.editUserFullName('Edited Full Name');
      cy.wait('@update-user').then((xhr) => {
        assert.equal(xhr.response.statusCode, 500);
      });
      cy.contains('User successfully created', {timeout:5000});
    });
  
    it('Super user can inactivate an existing user', () => {
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
  
    it('Super user can activate an inactive user', () => {
      
    });
  
    it('Super user can set another user as super user', () => {
      
    });
  
    it('user can navigate to next page if required', () => {
  
    });
  
    it('user can set rows per page displayed', () => {
  
    });
  });
});