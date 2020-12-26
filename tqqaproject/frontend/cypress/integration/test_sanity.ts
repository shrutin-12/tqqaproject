import login from '../support/page-models/login';

const admin_email = 'admin@tqqaproject.com';
const admin_password = 'changethis';

describe('Sanity Test Suite', () => {
  it('Login as an admin user', () => {
    cy.visit('http://localhost/login');
    login.login(admin_email, admin_password);
  });

  describe('As a super user', () => {
    it('user can view profile', () => {

    });
  
    it('user can edit own profile', () => {
  
    });
  
    it('user can change password', () => {
  
    });
  
    it('can create a new user', () => {
  
    });
  
    it('can edit the newly created user', () => {
  
    });
  });

  it('Logout and login as the newly created user', () => {
    
  });
  
  describe('As a normal user,', () => {

    it('create user option is not avilable', () => {

    });

    it('view/edit profile and change password options are aavailable', () => {

    });
  });
})