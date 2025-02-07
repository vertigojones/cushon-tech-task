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

const ISAInvestmentForm: React.FC = () => {
  // State for investment options
  const [availableFunds, setAvailableFunds] = useState<Fund[]>([])
  const [minInvestment, setMinInvestment] = useState<number>(0)
  const [maxInvestment, setMaxInvestment] = useState<number>(0)

  // State to track form submission and display success message
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    amount: string
    fundName: string
  } | null>(null)

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
   * Fetch mock investment options from API on component mount
   * @todo - create type for data object
   */
  useEffect(() => {
    fetchISAInvestmentOptions().then((data: any) => {
      setAvailableFunds(data.availableFunds)
      setMinInvestment(data.minInvestment)
      setMaxInvestment(data.maxInvestment)
    })
  }, [])

  /**
   * Handle form submission
   * @param event - Form submission event
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validate the form
    const validationResults = validateForm(
      { ...formData, amount: parseFloat(formData.amount) || 0 }, // Convert amount to number for validation
      minInvestment,
      maxInvestment
    )

    setErrors(validationResults)

    if (validationResults.isValid) {
      // Find the selected fund name based on the fund ID
      const selectedFund = availableFunds.find((f) => f.id === formData.fund)

      if (selectedFund) {
        // Store submitted data to show in success message
        setSubmittedData({
          amount: parseFloat(formData.amount).toFixed(2), // Format to 2 decimal places
          fundName: selectedFund.name,
        })

        setSubmitted(true)

        // Reset form fields
        setFormData({ fund: "", amount: "" })

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000)
      }
    }
  }

  /**
   * Handle form input changes
   * @param event - Change event from input or select element
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
          // Display the form when not submitted
          <form onSubmit={handleSubmit}>
            {/* Fund Selection */}
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

            {/* Investment Amount Input */}
            <FormGroup>
              <Label htmlFor="amount">Investment Amount (£)</Label>
              <Input
                id="amount"
                type="text" // Keep as text to allow decimal input properly
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min={minInvestment}
                max={maxInvestment}
                disabled={minInvestment === 0} // Disable input if API hasn't loaded
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
      </FormContainer>
    </PageContainer>
  )
}

export default ISAInvestmentForm
