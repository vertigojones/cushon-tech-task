Feature: Validate ISA Investment Form

  Scenario: Valid investment selection
    Given a user selects the "Cushon Equities Fund" fund
    And enters an amount of 100
    When the form is validated
    Then the form should be valid

  Scenario: Missing fund selection
    Given a user does not select a fund
    And enters an amount of 100
    When the form is validated
    Then the form should be invalid
    And the error message should be "Please select a fund"

  Scenario: Investment below minimum limit
    Given a user selects the "Cushon Bonds Fund" fund
    And enters an amount of 10
    When the form is validated
    Then the form should be invalid
    And the error message should be "Minimum investment is £25"

  Scenario: Investment above maximum limit
    Given a user selects the "Cushon Mixed Fund" fund
    And enters an amount of 25000
    When the form is validated
    Then the form should be invalid
    And the error message should be "Maximum investment is £20000"
