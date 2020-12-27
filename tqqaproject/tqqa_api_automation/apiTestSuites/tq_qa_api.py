import credentials

import requests
import json
import urllib

class Tq_Qa_Api():

  def __init__(self, creds = None):
    self.base_url = credentials.env['env']
    self.creds = creds
    if self.creds is None:
      self.creds = credentials.super_user
    body = self.__json_request('{0}/api/v1/login/access-token'.format(self.base_url), post=self.creds, content_type="urlencode")
    self.token = body['access_token']
    self.url = self.base_url
    

  def __json_request(self, url, type ='POST', post = None, content_type='json'):
    if content_type == 'json':
      headers={'Content-Type':'application/json; charset=UTF-8', 'Authorization': 'bearer {0}'.format(self.token)}
      self.resp = requests.request(type,url,json=post,headers=headers)
    else:
      try:
        post_data = urllib.parse.urlencode(post)
      except:
        post_data = post
      headers = {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      self.resp = requests.request(type,url,data=post_data,headers = headers)
    try:
      self.resp.raise_for_status()
    except requests.HTTPError as e:
      raise requests.HTTPError(e.response.text, response=e.response)
    respJson = self.resp.json()
    return respJson

  def password_recovery(self,email):
    url = '{0}/api/v1/password-recovery/{1}'.format(self.base_url, email)
    response = self.__json_request(url=url, type='POST')
    return response

  def reset_password(self, new_password):
    url = '{0}/api/v1/reset-password/'.format(self.base_url)
    payload = {'token': self.token, 'new_password': new_password}
    response = self.__json_request(url=url, type='POST', post=payload)
    return response

  def get_users(self):
    url = '{0}/api/v1/users/'.format(self.base_url)
    response = self.__json_request(url=url, type = 'GET')
    return response

  def create_user(self, payload):
    url = '{0}/api/v1/users/'.format(self.base_url)
    response = self.__json_request(url=url,type='POST',post=payload)
    return response

  def get_user_by_id(self, user_id):
    url = '{0}/api/v1/users/{1}'.format(self.base_url,user_id)
    response = self.__json_request(url=url,type='GET')
    return response

  def update_user(self, user_id, payload):
    url = '{0}/api/v1/users/{1}'.format(self.base_url,user_id)
    response = self.__json_request(url=url,type='PUT',post=payload)
    return response
  
  def get_profile(self):
    url = '{0}/api/v1/users/me'.format(self.base_url)
    response = self.__json_request(url=url, type='GET')
    return response

  def update_profile(self, payload):
    url = '{0}/api/v1/users/me'.format(self.base_url)
    response = self.__json_request(url=url, type='PUT', post=payload)
    return response



  

  
    