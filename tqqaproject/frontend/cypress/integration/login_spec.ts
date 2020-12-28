import loginPage from '../support/page-models/login';

const ADMIN_EMAIL = 'admin@tqqaproject.com';
const ADMIN_PASSWORD = 'changethis';

describe('Login Suite', () => {

  beforeEach(() => {
    cy.visit('http://localhost/login');
  })

  it('Error message is shown when email/ password is not entered', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost/api/v1/login/access-token'
    }).as('get-tokens');

    cy.contains('.v-btn__content', 'Login')
      .click();

    cy.wait('@get-tokens').then((xhr) => {
      assert.equal(xhr.response.statusCode, 422);
    });
    cy.contains(' Incorrect email or password ')
      .should('be.visible');
  });

  it('Error message is shown for incorrect email/password', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost/api/v1/login/access-token'
    }).as('get-tokens');

    loginPage.login('incorrect@email.com', 'incorrect pwd');

    cy.wait('@get-tokens').then((xhr) => {
      assert.equal(xhr.response.statusCode, 400);
    });
    cy.contains(' Incorrect email or password ')
      .should('be.visible');
  });

  it('User can reset password', () => {
    loginPage.clickForgotPassword()
      .forgotPassword('admin@tqqaproject.com');
  });

  it('user can cancel forgot password', () => {
    loginPage.clickForgotPassword()
      .cancelForgotPassword();
    cy.get(loginPage.LOGIN_EMAIL_CSS)
      .should('be.visible');
  });

  it('inactive users cannot login to the app', () => {
    // try log in as an inactive user
  });

  it('User can login successfully using correct credentials', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost/api/v1/login/access-token'
    }).as('get-tokens');

    loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
    cy.wait('@get-tokens').then((res) => {
      assert.equal(res.response.statusCode, 200);
    });
  });
});