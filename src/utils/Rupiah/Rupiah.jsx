export const formatCurrency = (value) => {
  let price = value;
  if (!price) {
    price = "0";
  } else {
    price = `${Math.round(parseInt(price))}`;
  }

  price = `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  return price;
}