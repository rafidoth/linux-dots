import { RiFolder5Fill } from "react-icons/ri";

interface P{
    IconName
}



const SingleIconDesktop = ({}: P) => {
  return (
    <span>
      <RiFolder5Fill
        size="3em" 
        color="red"
      />
      Home
    </span>
  )
}

export default SingleIconDesktop
