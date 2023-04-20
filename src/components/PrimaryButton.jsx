import { Link } from "react-router-dom";

const PrimaryButton = ({ btnName, onClick, form, path }) => {
  const btnStyle =
    " bg-yellow-400 py-1.5 px-3.5 text-gray-800 text-[.8375rem] font-medium rounded-sm shadow-sm  hover:bg-yellow-500 hover:text-black";

  return (
    <>
      {(form || onClick) && (
        <button form={form} onClick={onClick} className={btnStyle}>
          {btnName}
        </button>
      )}

      {path && (
        <Link to={path} className={btnStyle}>
          {btnName}
        </Link>
      )}
    </>
  );
};

export default PrimaryButton;
