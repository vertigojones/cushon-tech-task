export const fetchISAInvestmentOptions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        availableFunds: [
          { id: "uk-equity", name: "Cushon Global Equity" },
          { id: "global-bonds", name: "Cushon Global Bonds" },
          { id: "cash", name: "Cushon Cash" },
        ],
        minInvestment: 25,
        maxInvestment: 20000,
      })
    }, 500) // Simulates API response delay
  })
}
