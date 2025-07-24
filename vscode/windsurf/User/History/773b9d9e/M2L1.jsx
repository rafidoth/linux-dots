const MyBtn = ({ onClick, children, className }) => {
  return (
    <button
      className={`cursor-pointer bg-black text-white px-2 rounded-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyBtn;
