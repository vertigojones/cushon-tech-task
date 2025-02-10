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
  funds: string[] // Ready for multiple funds but only using one for now
  amount: string
}

interface Investment {
  amount: string
  funds: { id: string; name: string }[]
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
    funds: [],
    amount: "",
  })

  // State to store form validation errors
  const [errors, setErrors] = useState<{ funds: string; amount: string }>({
    funds: "",
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

    // Retrieve stored investments from local storage
    const storedInvestments = JSON.parse(
      localStorage.getItem("investments") || "[]"
    )
    setInvestmentHistory(storedInvestments)
  }, [])

  /**
   * Handle form submission
   * Validates input, stores investment, and updates history
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
      // Convert selected fund ID to full fund object
      const selectedFunds = formData.funds.map((fundId) => {
        const fund = availableFunds.find((f) => f.id === fundId)
        return { id: fundId, name: fund?.name || "Unknown Fund" }
      })

      // Create new investment entry
      const newInvestment: Investment = {
        amount: parseFloat(formData.amount).toFixed(2),
        funds: selectedFunds,
        timestamp: new Date().toISOString(),
      }

      // Store submitted data for UI feedback
      setSubmittedData(newInvestment)
      setSubmitted(true)
      setFormData({ funds: [], amount: "" })

      // Save investment details to localStorage
      const previousInvestments = JSON.parse(
        localStorage.getItem("investments") || "[]"
      )
      const updatedInvestments = [...previousInvestments, newInvestment]
      localStorage.setItem("investments", JSON.stringify(updatedInvestments))
      setInvestmentHistory(updatedInvestments)

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  /**
   * Handle form input changes
   * Updates state dynamically based on user input
   */
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    if (name === "funds") {
      // Store selected fund in an array (ready for future multi-fund selection)
      setFormData((prev) => ({
        ...prev,
        funds: [value],
      }))
    } else if (name === "amount") {
      // Allow only numbers with up to 2 decimal places
      if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          amount: value,
        }))
      }
    }
  }

  // Check if the form is valid for submission
  const isFormValid =
    formData.funds.length > 0 && parseFloat(formData.amount) >= minInvestment

  return (
    <PageContainer>
      <FormContainer>
        <Title>Invest in a Cushon ISA</Title>

        {/* Display success message after submission */}
        {submitted && submittedData ? (
          <SuccessMessage>
            Your payment of <strong>£{submittedData.amount}</strong> has been
            successfully submitted to your
            <strong>
              {" "}
              {submittedData.funds.map((fund) => fund.name).join(", ")}
            </strong>
            .
          </SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Fund Selection - Using dropdown but ready for multi-fund */}
            <FormGroup>
              <Label>Select a Fund</Label>
              <Select
                id="funds"
                name="funds"
                value={formData.funds[0] || ""}
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
              {errors.funds && <ErrorMessage>{errors.funds}</ErrorMessage>}
            </FormGroup>

            {/* Investment Amount Input */}
            <FormGroup>
              <Label>Investment Amount (£)</Label>
              <Input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min={minInvestment}
                max={maxInvestment}
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
                  <strong>£{investment.amount}</strong> invested in
                  <strong>
                    {" "}
                    {investment.funds?.map((fund) => fund.name).join(", ") ||
                      "Unknown Fund"}
                  </strong>{" "}
                  on{" "}
                  {new Date(investment.timestamp).toLocaleDateString("en-GB")}{" "}
                  at {new Date(investment.timestamp).toLocaleTimeString()}
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
