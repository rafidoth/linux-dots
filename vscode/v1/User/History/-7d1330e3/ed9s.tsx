import { RiFolder5Fill } from "react-icons/ri";

interface P{
    IconName : string
}



const SingleIconDesktop = ({iconName}: P) => {
  return (
    <span>
      <RiFolder5Fill
        size="3em" 
        color="red"
      />
      {iconName} 
    </span>
  )
}

export default SingleIconDesktop
