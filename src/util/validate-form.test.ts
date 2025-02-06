import { validateForm } from "../util/validate-form";

describe("validateForm", () => {
  const minInvestment = 25;
  const maxInvestment = 20000;

  test("valid form data", () => {
    const formData = { fund: "Cushon Equities Fund", amount: 100 };
    const result = validateForm(formData, minInvestment, maxInvestment);
    expect(result.isValid).toBe(true);
    expect(result.fund).toBe("");
    expect(result.amount).toBe("");
  });

  test("missing fund selection", () => {
    const formData = { fund: "", amount: 100 };
    const result = validateForm(formData, minInvestment, maxInvestment);
    expect(result.isValid).toBe(false);
    expect(result.fund).toBe("Please select a fund");
  });

  test("investment below minimum limit", () => {
    const formData = { fund: "Cushon Bonds Fund", amount: 10 };
    const result = validateForm(formData, minInvestment, maxInvestment);
    expect(result.isValid).toBe(false);
    expect(result.amount).toBe("Minimum investment is £25");
  });

  test("investment above maximum limit", () => {
    const formData = { fund: "Cushon Mixed Fund", amount: 25000 };
    const result = validateForm(formData, minInvestment, maxInvestment);
    expect(result.isValid).toBe(false);
    expect(result.amount).toBe("Maximum investment is £20000");
  });
});
