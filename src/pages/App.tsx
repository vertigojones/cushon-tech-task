import { useState, FormEvent, ChangeEvent } from "react"
import styled from "styled-components"

const FormContainer = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1rem;
  color: #1a1a1a;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1a1a1a;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  aria-live: polite;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ disabled }) => (disabled ? "#9ca3af" : "#2563eb")};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#9ca3af" : "#1d4ed8")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
  }
`

const SuccessMessage = styled.p`
  color: #059669;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  background-color: #ecfdf5;
  border-radius: 0.5rem;
`

const funds = [
  { id: "equities", name: "Cushon Equities Fund" },
  { id: "bonds", name: "Cushon Bonds Fund" },
  { id: "mixed", name: "Cushon Mixed Fund" },
] as const

interface FormData {
  fund: string
  amount: number | ""
}

interface FormErrors {
  fund: string
  amount: string
}

export default function ISAInvestmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fund: "",
    amount: "",
  })

  const [errors, setErrors] = useState<FormErrors>({
    fund: "",
    amount: "",
  })

  const validateForm = () => {
    const newErrors = {
      fund: "",
      amount: "",
    }
    let isValid = true

    if (!formData.fund) {
      newErrors.fund = "Please select a fund"
      isValid = false
    }

    const amount = Number(formData.amount)
    if (!amount || amount < 25) {
      newErrors.amount = "Minimum investment is £25"
      isValid = false
    } else if (amount > 20000) {
      newErrors.amount = "Maximum investment is £20,000"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Investment Data:", formData)
      setSubmitted(true)
      setFormData({ fund: "", amount: "" })

      // Reset form after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Math.max(0, Number(value)) : value,
    }))
  }

  const isFormValid = formData.fund !== "" && Number(formData.amount) >= 25

  return (
    <FormContainer>
      <Title>Invest in a Cushon ISA</Title>
      {submitted ? (
        <SuccessMessage>Investment submitted successfully!</SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="fund">Select a Fund</Label>
            <Select
              id="fund"
              name="fund"
              value={formData.fund}
              onChange={handleChange}
            >
              <option value="" disabled>
                Choose a fund...
              </option>
              {funds.map((fund) => (
                <option key={fund.id} value={fund.id}>
                  {fund.name}
                </option>
              ))}
            </Select>
            {errors.fund && <ErrorMessage>{errors.fund}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="amount">Investment Amount (£)</Label>
            <Input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount.toString()}
              onChange={handleChange}
              placeholder="Enter amount"
              min="25"
              max="20000"
            />
            {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit" disabled={!isFormValid}>
            Invest Now
          </SubmitButton>
        </form>
      )}
    </FormContainer>
  )
}
