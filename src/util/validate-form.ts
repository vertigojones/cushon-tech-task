interface FormData {
  fund: string
  amount: number | ""
}

interface FormErrors {
  fund: string
  amount: string
}

export const validateForm = (
  formData: FormData,
  minInvestment: number = 25,
  maxInvestment: number = 20000
): FormErrors & { isValid: boolean } => {
  const newErrors: FormErrors = {
    fund: "",
    amount: "",
  }
  let isValid = true

  if (!formData.fund) {
    newErrors.fund = "Please select a fund"
    isValid = false
  }

  const amount = Number(formData.amount)
  if (!amount || amount < minInvestment) {
    newErrors.amount = `Minimum investment is £${minInvestment}`
    isValid = false
  } else if (amount > maxInvestment) {
    newErrors.amount = `Maximum investment is £${maxInvestment}`
    isValid = false
  }

  return { ...newErrors, isValid }
}
