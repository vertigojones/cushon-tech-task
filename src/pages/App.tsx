import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { validateForm } from "../util/validate-form"
import { fetchISAInvestmentOptions } from "../mock/mockApi"
import {
  PageContainer,
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

interface ISAInvestmentFormProps {}

interface FormData {
  fund: string
  amount: number | ""
}

const ISAInvestmentForm: React.FC<ISAInvestmentFormProps> = () => {
  const [availableFunds, setAvailableFunds] = useState<Fund[]>([])
  const [minInvestment, setMinInvestment] = useState<number>(0)
  const [maxInvestment, setMaxInvestment] = useState<number>(0)

  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    amount: number
    fundName: string
  } | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fund: "",
    amount: "",
  })

  const [errors, setErrors] = useState({
    fund: "",
    amount: "",
  })

  // Fetch mock API data on component mount
  useEffect(() => {
    fetchISAInvestmentOptions().then((data: any) => {
      setAvailableFunds(data.availableFunds)
      setMinInvestment(data.minInvestment)
      setMaxInvestment(data.maxInvestment)
    })
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationResults = validateForm(
      formData,
      minInvestment,
      maxInvestment
    )

    setErrors(validationResults)

    if (validationResults.isValid) {
      const selectedFund = availableFunds.find((f) => f.id === formData.fund)

      if (selectedFund) {
        setSubmittedData({
          amount: Number(formData.amount),
          fundName: selectedFund.name,
        })
        setSubmitted(true)
        setFormData({ fund: "", amount: "" })

        // Reset form after 3 seconds
        setTimeout(() => setSubmitted(false), 3000)
      }
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
    <PageContainer>
      <FormContainer>
        <Title>Invest in a Cushon ISA</Title>
        {submitted && submittedData ? (
          <SuccessMessage>
            Your payment of <strong>£{submittedData.amount.toFixed(2)}</strong>
            has been successfully submitted to{" "}
            <strong>{submittedData.fundName}</strong>.
          </SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="fund">Select a Fund</Label>
              <Select
                id="fund"
                name="fund"
                value={formData.fund}
                onChange={handleChange}
                disabled={availableFunds.length === 0} // Disable if API hasn't loaded
              >
                <option value="" disabled>
                  {availableFunds.length === 0
                    ? "Loading funds..."
                    : "Choose a fund..."}
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
                disabled={minInvestment === 0} // Disable input if API hasn't loaded
              />
              {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={!isFormValid || availableFunds.length === 0}
            >
              Invest Now
            </SubmitButton>
          </form>
        )}
      </FormContainer>
    </PageContainer>
  )
}

export default ISAInvestmentForm
