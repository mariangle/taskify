import { 
  FaBell,  
  FaEnvelope,
  FaUserCircle, 
 } from "react-icons/fa";

const PersonalMenu = () => {
  return (
    <div className="flex gap-2 items-center">
      <FaBell size={20}/>
      <FaEnvelope size={20}/>
      <FaUserCircle size={25}/>
    </div>
  )
}

export default PersonalMenu;