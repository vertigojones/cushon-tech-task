import { useState, FormEvent, ChangeEvent } from "react"
import { validateForm } from "../util/validate-form" // Import validation function
import {
  FormContainer,
  Title,
  FormGroup,
  Label,
  Select,
  Input,
  ErrorMessage,
  SubmitButton,
  SuccessMessage,
} from "../styles/global-styles" // Import styled components

const funds = [
  { id: "equities", name: "Cushon Equities Fund" },
  { id: "bonds", name: "Cushon Bonds Fund" },
  { id: "mixed", name: "Cushon Mixed Fund" },
] as const

interface FormData {
  fund: string
  amount: number | ""
}

export default function ISAInvestmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fund: "",
    amount: "",
  })

  const [errors, setErrors] = useState({
    fund: "",
    amount: "",
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationResults = validateForm(formData)

    setErrors(validationResults)

    if (validationResults.isValid) {
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

  const isFormValid = formData.fund !== "" && Number(formData.amount) >= 100

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
              min="100"
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
