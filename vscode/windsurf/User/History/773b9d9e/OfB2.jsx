const MyBtn = ({ onClick, children, className }) => {
  return (
    <button className={`cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default MyBtn;
