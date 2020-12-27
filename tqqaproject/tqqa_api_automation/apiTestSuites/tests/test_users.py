import pytest
import random

class Test_users:
  user_id = None
  email = 'apitest{0}@test.com'.format(random.randint(1,1000))

  def test_create_user(self, tq_super):
    payload = {'email': self.email, 'is_active': True, 'is_superuser': False, 'full_name': 'API Test', 'password': 'test123'}
    response = tq_super.create_user(payload)
    global user_id
    user_id = response['id']
    print(user_id)

  def test_get_users(self, tq_super):
    response = tq_super.get_users()
    for user in response:
      if user['email'] == self.email:
        assert user['id'] == user_id
        assert user['full_name'] == 'API Test'

  def test_update_user(self,tq_super):
    payload = {'email': self.email, 'is_active': True, 'is_superuser': False,'full_name': 'API Test Updated','password': 'test123'}
    tq_super.update_user(user_id, payload)
    
  def test_get_user(self, tq_super):
    response = tq_super.get_user_by_id(user_id)
    assert response['id'] == user_id
    assert response['email'] == self.email
    assert response['full_name'] == 'API Test Updated'
    assert response['is_superuser'] == False
    assert response['is_active'] == True

  
