const MyBtn = ({ onClick, children, className, disabled }) => {
  return (
    <button
      className={`cursor-pointer transition-colors duration-300 text-white px-2 rounded-sm  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyBtn;
