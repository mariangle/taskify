import { HiMicrophone } from "react-icons/hi"

const Microphone = () => {
  return (
    <div className="w-full flex justify-center items-center">
        <div className="bg-blue-200 p-4 rounded-full">
            <HiMicrophone className="w-10 h-10 text-blue-500"/>
        </div>
    </div>
  )
}

export default Microphone