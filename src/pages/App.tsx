import { useState, FormEvent, ChangeEvent } from "react"
import { validateForm } from "../util/validate-form"
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
} from "../styles/global-styles"

interface Fund {
  id: string
  name: string
}

interface ISAInvestmentFormProps {
  availableFunds?: Fund[] // Makes funds optional (uses default props)
  minInvestment?: number
  maxInvestment?: number
}

interface FormData {
  fund: string
  amount: number | ""
}

const ISAInvestmentForm: React.FC<ISAInvestmentFormProps> = ({
  availableFunds = [
    { id: "equities", name: "Cushon Equities Fund" },
    { id: "bonds", name: "Cushon Bonds Fund" },
    { id: "mixed", name: "Cushon Mixed Fund" },
  ],
  minInvestment = 25,
  maxInvestment = 20000,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fund: "",
    amount: "",
  })

  const [errors, setErrors] = useState({
    fund: "",
    amount: "",
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationResults = validateForm(
      formData,
      minInvestment,
      maxInvestment
    )

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
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Math.max(0, Number(value)) : value,
    }))
  }

  const isFormValid =
    formData.fund !== "" && Number(formData.amount) >= minInvestment

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
              {availableFunds.map((fund) => (
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
              min={minInvestment}
              max={maxInvestment}
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

export default ISAInvestmentForm
