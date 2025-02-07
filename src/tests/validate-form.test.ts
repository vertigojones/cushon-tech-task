import { validateForm } from "../util/validate-form"

describe("validateForm", () => {
  const minInvestment = 25
  const maxInvestment = 20000

  test("valid form data", () => {
    const formData = { fund: "Cushon Global Equity", amount: 100 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(true)
    expect(result.fund).toBe("")
    expect(result.amount).toBe("")
  })

  test("valid decimal form data", () => {
    const formData = { fund: "Cushon Global Bonds", amount: 100.5 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(true)
  })

  test("missing fund selection", () => {
    const formData = { fund: "", amount: 100 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(false)
    expect(result.fund).toBe("Please select a fund")
  })

  test("investment below minimum limit", () => {
    const formData = { fund: "Cushon Cash", amount: 10 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(false)
    expect(result.amount).toBe("Minimum investment is £25")
  })

  test("investment exactly at minimum limit", () => {
    const formData = { fund: "Cushon Global Equity", amount: 25 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(true)
  })

  test("investment with decimal below minimum limit", () => {
    const formData = { fund: "Cushon Global Bonds", amount: 24.99 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(false)
    expect(result.amount).toBe("Minimum investment is £25")
  })

  test("investment above maximum limit", () => {
    const formData = { fund: "Cushon Cash", amount: 25000 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(false)
    expect(result.amount).toBe("Maximum investment is £20000")
  })

  test("investment exactly at maximum limit", () => {
    const formData = { fund: "Cushon Global Equity", amount: 20000 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(true)
  })

  test("investment with decimal above maximum limit", () => {
    const formData = { fund: "Cushon Global Bonds", amount: 20000.01 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(false)
    expect(result.amount).toBe("Maximum investment is £20000")
  })

  test("invalid input with multiple decimal places", () => {
    const formData = { fund: "Cushon Cash", amount: 100.999 }
    const result = validateForm(formData, minInvestment, maxInvestment)
    expect(result.isValid).toBe(false)
    expect(result.amount).toBe(
      "Please enter a valid amount with up to 2 decimal places"
    )
  })
})
