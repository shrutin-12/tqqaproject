import pytest

class Test_Profile:
  def test_get_profile(self,tq_super):
    response = tq_super.get_profile()
    assert response['email'] == 'admin@tqqaproject.com'
    assert response['is_superuser'] == True
  
  def test_update_profile(self,tq_super):
    payload = {'password': 'changethis', 'full_name': 'Updated Name', 'email': 'admin@tqqaproject.com'}
    response = tq_super.update_profile(payload)
    assert response['email'] == 'admin@tqqaproject.com'
    assert response['full_name'] == 'Updated Name'

  def test_reset_password (self, tq_super):
    new_password = 'changethis'
    response = tq_super.reset_password(new_password)
    print(response)

  def test_recover_password(self,tq_super):
    response = tq_super.password_recovery('admin@tqqaproject.com')
    print(response)
