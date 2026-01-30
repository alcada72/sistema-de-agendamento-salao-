export function FormatPrice(price: number | string) {
  return price.toLocaleString("pt-ao", {
    style: "currency",
    currency: "AOA",
  })
}