import { RiFolder5Fill } from "react-icons/ri";

interface P{
    iconName : string
}



const SingleIconDesktop = (props: P) => {
  return (
    <span>
      <RiFolder5Fill
        size="3em" 
        color="red"
      />
      {props.iconName} 
    </span>
  )
}

export default SingleIconDesktop
