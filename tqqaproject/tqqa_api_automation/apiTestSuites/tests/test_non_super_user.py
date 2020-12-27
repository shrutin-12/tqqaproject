import pytest

class Test_Non_Super_User:
  def test_get_profile(self, tq_normal):
    response = tq_normal.get_profile()
    assert response['email'] == 'test1@test.com'
    assert response['is_superuser'] == False

  def test_update_profile(self,tq_normal):
    payload = {'password': 'P@ssw0rd', 'full_name': 'Updated Name', 'email': 'test1@test.com'}
    response = tq_normal.update_profile(payload)
    assert response['email'] == 'test1@test.com'
    assert response['full_name'] == 'Updated Name'

  def test_reset_password (self, tq_normal):
    new_password = 'P@ssw0rd'
    response = tq_normal.reset_password(new_password)
    print(response)
    # assertions

  def test_recover_password(self,tq_normal):
    response = tq_normal.password_recovery('test1@test.com')
    print(response)
    # assertions