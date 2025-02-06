export const fetchISAInvestmentOptions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        availableFunds: [
          { id: "equities", name: "Cushon Equities Fund" },
          { id: "bonds", name: "Cushon Bonds Fund" },
          { id: "mixed", name: "Cushon Mixed Fund" },
        ],
        minInvestment: 25,
        maxInvestment: 20000,
      })
    }, 500) // Simulates API response delay
  })
}
