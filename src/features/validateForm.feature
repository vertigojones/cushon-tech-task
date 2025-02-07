Feature: Validate ISA Investment Form

  Scenario: Valid investment selection
    Given a user selects the "Cushon Global Equity" fund
    And enters an amount of 100
    When the form is validated
    Then the form should be valid

  Scenario: Valid investment with decimal amount
    Given a user selects the "Cushon Global Bonds" fund
    And enters an amount of 100.50
    When the form is validated
    Then the form should be valid

  Scenario: Missing fund selection
    Given a user does not select a fund
    And enters an amount of 100
    When the form is validated
    Then the form should be invalid
    And the error message should be "Please select a fund"

  Scenario: Investment below minimum limit
    Given a user selects the "Cushon Cash" fund
    And enters an amount of 10
    When the form is validated
    Then the form should be invalid
    And the error message should be "Minimum investment is £25"

  Scenario: Investment exactly at minimum limit
    Given a user selects the "Cushon Global Equity" fund
    And enters an amount of 25
    When the form is validated
    Then the form should be valid

  Scenario: Investment with decimal below minimum limit
    Given a user selects the "Cushon Global Bonds" fund
    And enters an amount of 24.99
    When the form is validated
    Then the form should be invalid
    And the error message should be "Minimum investment is £25"

  Scenario: Investment above maximum limit
    Given a user selects the "Cushon Cash" fund
    And enters an amount of 25000
    When the form is validated
    Then the form should be invalid
    And the error message should be "Maximum investment is £20000"

  Scenario: Investment exactly at maximum limit
    Given a user selects the "Cushon Global Equity" fund
    And enters an amount of 20000
    When the form is validated
    Then the form should be valid

  Scenario: Investment with decimal above maximum limit
    Given a user selects the "Cushon Global Bonds" fund
    And enters an amount of 20000.01
    When the form is validated
    Then the form should be invalid
    And the error message should be "Maximum investment is £20000"

  Scenario: Invalid input with multiple decimal places
    Given a user selects the "Cushon Cash" fund
    And enters an amount of 100.999
    When the form is validated
    Then the form should be invalid
    And the error message should be "Please enter a valid amount with up to 2 decimal places"
