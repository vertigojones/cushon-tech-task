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

interface FormData {
  fund: string
  amount: string
}

interface Investment {
  amount: string
  fundName: string
  timestamp: string
}

const ISAInvestmentForm: React.FC = () => {
  // State for investment options
  const [availableFunds, setAvailableFunds] = useState<Fund[]>([])
  const [minInvestment, setMinInvestment] = useState<number>(0)
  const [maxInvestment, setMaxInvestment] = useState<number>(0)

  // State for storing past investments
  const [investmentHistory, setInvestmentHistory] = useState<Investment[]>([])

  // State to track form submission and display success message
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<Investment | null>(null)

  // State to store user input
  const [formData, setFormData] = useState<FormData>({
    fund: "",
    amount: "",
  })

  // State to store form validation errors
  const [errors, setErrors] = useState({
    fund: "",
    amount: "",
  })

  /**
   * Fetch mock investment options and past investments on component mount
   */
  useEffect(() => {
    fetchISAInvestmentOptions().then((data: any) => {
      setAvailableFunds(data.availableFunds)
      setMinInvestment(data.minInvestment)
      setMaxInvestment(data.maxInvestment)
    })

    // Retrieve stored investments
    const storedInvestments = JSON.parse(
      localStorage.getItem("investments") || "[]"
    )
    setInvestmentHistory(storedInvestments)
  }, [])

  /**
   * Handle form submission
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate the form
    const validationResults = validateForm(
      { ...formData, amount: parseFloat(formData.amount) || 0 },
      minInvestment,
      maxInvestment
    )

    setErrors(validationResults)

    if (validationResults.isValid) {
      // Find the selected fund name based on the fund ID
      const selectedFund = availableFunds.find((f) => f.id === formData.fund)

      if (selectedFund) {
        // Create new investment entry
        const newInvestment = {
          amount: parseFloat(formData.amount).toFixed(2),
          fundName: selectedFund.name,
          timestamp: new Date().toISOString(),
        }

        setSubmittedData(newInvestment)
        setSubmitted(true)
        setFormData({ fund: "", amount: "" })

        // Save investment details to localStorage
        const previousInvestments = JSON.parse(
          localStorage.getItem("investments") || "[]"
        )
        const updatedInvestments = [...previousInvestments, newInvestment]
        localStorage.setItem("investments", JSON.stringify(updatedInvestments))

        // Update state to reflect new investments
        setInvestmentHistory(updatedInvestments)

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000)
      }
    }
  }

  /**
   * Handle form input changes
   */
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    if (name === "amount") {
      // Allow only numbers with up to 2 decimal places
      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          amount: value, // Keep as string to preserve user input
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Check if the form is valid for submission
  const isFormValid =
    formData.fund !== "" && parseFloat(formData.amount) >= minInvestment

  return (
    <PageContainer>
      <FormContainer>
        <Title>Invest in a Cushon ISA</Title>

        {/* Display success message after submission */}
        {submitted && submittedData ? (
          <SuccessMessage>
            Your payment of <strong>£{submittedData.amount}</strong> has been
            successfully submitted to your{" "}
            <strong>{submittedData.fundName}</strong>.
          </SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Fund Selection */}
            <FormGroup>
              <Label htmlFor="fund">Select a Fund</Label>
              <Select
                id="fund"
                name="fund"
                value={formData.fund}
                onChange={handleChange}
                disabled={availableFunds.length === 0}
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

            {/* Investment Amount Input */}
            <FormGroup>
              <Label htmlFor="amount">Investment Amount (£)</Label>
              <Input
                id="amount"
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min={minInvestment}
                max={maxInvestment}
                disabled={minInvestment === 0}
              />
              {errors.amount && <ErrorMessage>{errors.amount}</ErrorMessage>}
            </FormGroup>

            {/* Submit Button */}
            <SubmitButton
              type="submit"
              disabled={!isFormValid || availableFunds.length === 0}
            >
              Invest Now
            </SubmitButton>
          </form>
        )}

        {/* Display Past Investments */}
        {investmentHistory.length > 0 && (
          <div>
            <h3>Past Investments</h3>
            <ul>
              {investmentHistory.map((investment, index) => (
                <li key={index}>
                  <strong>£{investment.amount}</strong> invested in{" "}
                  <strong>{investment.fundName}</strong> on{" "}
                  {new Date(investment.timestamp).toLocaleDateString()} at{" "}
                  {new Date(investment.timestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </FormContainer>
    </PageContainer>
  )
}

export default ISAInvestmentForm
