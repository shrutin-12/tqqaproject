import tq_qa_api 
import credentials
import pytest

@pytest.fixture(scope="class")
def tq_super():
  tq_super = tq_qa_api.Tq_Qa_Api(creds = credentials.super_user)
  return tq_super

@pytest.fixture(scope="class")
def tq_normal():
  tq_normal = tq_qa_api.Tq_Qa_Api(creds = credentials.normal_user)
  return tq_normal


