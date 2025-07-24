const MyBtn = ({ onClick, children, className }) => {
  return (
    <button className={` ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default MyBtn;
