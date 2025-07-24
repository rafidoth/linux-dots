const MyBtn = ({ onClick, children, className }) => {
  return (
    <button
      className={`cursor-pointer bg-black hover:bg-black/50 text-white px-2 rounded-sm  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyBtn;
