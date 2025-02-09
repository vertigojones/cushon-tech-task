export const fetchISAInvestmentOptions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        availableFunds: [
          { id: "global-equity", name: "Cushon Global Equity" },
          { id: "global-bonds", name: "Cushon Global Bonds" },
          { id: "cash", name: "Cushon Cash" },
        ],
        minInvestment: 25,
        maxInvestment: 25000,
      })
    }, 500)
  })
}
