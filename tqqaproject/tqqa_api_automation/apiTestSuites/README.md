API automation Framework:

To start, install pyTest using pip:
pip3 install pytest

Once installed, you can start running the test from command line using commands:
To run a single suite: pytest -s -v apiTestSuites/tests/test_xx.py
To run all the suites: pytest

Main folders or files:

tq_qa_api.py - Library of all the requests the application uses.
conftest.py - Contains two fixtures which return an object of Tq_Qa_Api class, after authenticating as super or non-super user.
credentails.py - File containing the credentials, etc.
tests folder - all the test files sit inside this folder.

Note: Each test file and test must start with test_ or end with _test.