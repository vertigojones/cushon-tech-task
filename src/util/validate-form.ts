interface FormData {
  fund: string
  amount: number | ""
}

interface FormErrors {
  fund: string
  amount: string
}

export const validateForm = (
  formData: FormData
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
  if (!amount || amount < 100) {
    newErrors.amount = "Minimum investment is £100"
    isValid = false
  } else if (amount > 20000) {
    newErrors.amount = "Maximum investment is £20,000"
    isValid = false
  }

  return { ...newErrors, isValid }
}
