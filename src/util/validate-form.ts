interface FormData {
  funds: string[] // Updated to support multiple fund selections
  amount: number | ""
}

interface FormErrors {
  funds: string
  amount: string
}

/**
 * Function to validate the ISA investment form
 * Ensures valid fund selection, investment amount, and decimal precision
 *
 * @param formData - The user's investment form data
 * @param minInvestment - The minimum allowed investment (default: £25)
 * @param maxInvestment - The maximum allowed investment (default: £25,000)
 * @returns An object containing validation errors and a boolean `isValid` flag
 */
export const validateForm = (
  formData: FormData,
  minInvestment: number = 25,
  maxInvestment: number = 25000
): FormErrors & { isValid: boolean } => {
  // Initialize error messages
  const newErrors: FormErrors = {
    funds: "",
    amount: "",
  }
  let isValid = true

  /**
   * 1. Validate Fund Selection - Ensures that at least one fund is selected.
   */
  if (!formData.funds.length) {
    newErrors.funds = "Please select at least one fund"
    isValid = false
  }

  // Convert the amount to a number for validation
  const amount = Number(formData.amount)

  /**
   * 2. Validate Amount Field
   * - Ensures that the amount is a valid number.
   * - Prevents negative values or non-numeric inputs.
   */
  if (isNaN(amount) || amount <= 0) {
    newErrors.amount = "Please enter a valid investment amount"
    isValid = false
  }

  /**
   * 3. Validate Decimal Precision
   * - Allows up to 2 decimal places (e.g., 100.50).
   * - Rejects values with more than 2 decimal places (e.g., 100.999).
   */
  if (!/^\d+(\.\d{1,2})?$/.test(amount.toString())) {
    newErrors.amount = "Please enter a valid amount with up to 2 decimal places"
    isValid = false
  }

  /**
   * 4. Validate Minimum Investment Limit
   * - Ensures the amount meets the minimum investment threshold.
   */
  if (amount < minInvestment) {
    newErrors.amount = `Minimum investment is £${minInvestment}`
    isValid = false
  } else if (amount > maxInvestment) {
    /**
     * 5️. Validate Maximum Investment Limit
     * - Ensures the amount does not exceed the maximum investment threshold.
     */
    newErrors.amount = `Maximum investment is £${maxInvestment}`
    isValid = false
  }

  // Return validation results
  return { ...newErrors, isValid }
}
