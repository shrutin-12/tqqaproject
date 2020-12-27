Cypress UI Automation Framework

This framework utilizes the Page Object Model (POM) design pattern. The idea is to separate user action (functions) and elements on each page into different classes. This increases readability and maintainabilty. The page object classes are located in 'support/page-models' folder

The test suites are located inside the 'intergration' folder.

Custom commands can be added to support/commands.js

To run the tests:

1. Install all dependencies using: npm install
2. Open Cypress GUI using : npx cypress open
3. Run Test suite in command line: npx cypress run --spec path-to-test