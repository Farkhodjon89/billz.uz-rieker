export const getPrice = (product) => {
  const normalPrice = product.woocsRegularPrice;
  const salePrice = product.woocsSalePrice;
  return {
    normalPrice,
    salePrice,
  };
};

export const getFormat = (
  number,
  floatingDigits = 0,
  splitBy = 3,
  splitter = " ",
  floatingSplitter = "."
) => {
  const re = `\\d(?=(\\d{${splitBy}})+${floatingDigits > 0 ? "\\D" : "$"})`;
  const num = (typeof number === "number" ? number : parseInt(number)).toFixed(
    Math.max(0, ~~floatingDigits)
  );

  return (floatingSplitter ? num.replace(".", floatingSplitter) : num).replace(
    new RegExp(re, "g"),
    `$&${splitter}`
  );
};

export const getDiscount = (normalPrice, salePrice) =>
  Math.round(
    ((parseInt(normalPrice) - parseInt(salePrice)) * 100) /
      parseInt(normalPrice)
  );

export const chunk = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};
