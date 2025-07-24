const MyBtn = ({ onClick, children, className, disabled }) => {
  return (
    <button
      className={`cursor-pointer bg-black hover:bg-gray-800 transition-colors duration-300 text-white px-2 rounded-sm  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyBtn;
