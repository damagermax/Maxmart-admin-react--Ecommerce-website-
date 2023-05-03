const StockStatus = ({ quantity }) => {
  return (
    <p
      className={`${
        quantity > 0 ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"
      } py-[4px] px-[6px] rounded-sm text-[0.65rem]  font-bold`}
    >
      {quantity > 0 ? `${quantity} in stock` : "Out of Stock"}
    </p>
  );
};

export default StockStatus;
