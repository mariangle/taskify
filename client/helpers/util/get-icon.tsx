import { 
    HiArrowSmDown, 
    HiArrowSmUp, 
    HiArrowSmRight,
    HiBriefcase,
    HiClipboard,
    HiCreditCard,
} from "react-icons/hi";

import { BiSolidDrink, BiSolidPlane } from "react-icons/bi";
import { FaGraduationCap, FaHome, FaShoppingCart, FaExclamationCircle, FaHashtag    } from "react-icons/fa";
import { IoFitness } from "react-icons/io5";

export const getIcon = (value: string, isHashtag: boolean) => {

    const items = [
        { name: 'Low', icon: <HiArrowSmDown /> },
        { name: 'Medium', icon: <HiArrowSmRight /> },
        { name: 'High', icon: <HiArrowSmUp /> },
        { name: 'Work', label: '', icon: <HiBriefcase /> },  
        { name: 'Personal', label: '', icon: <FaHome /> },  
        { name: 'Education', label: '', icon: <FaGraduationCap /> },  
        { name: 'Wellness', label: '', icon: <IoFitness /> },  
        { name: 'Chore', label: '', icon: <HiClipboard /> },  
        { name: 'Social', label: '', icon: <BiSolidDrink /> },  
        { name: 'Travel', label: '', icon: <BiSolidPlane /> },  
        { name: 'Finance', label: '', icon: <HiCreditCard /> },  
        { name: 'Urgent', label: '', icon: <FaExclamationCircle  /> },  
        { name: 'Shopping', label: '', icon: <FaShoppingCart /> },  

    ]

    const item = items.find((item) => item.name === value)

    if (isHashtag) return <FaHashtag />
        
    return item?.icon;
}