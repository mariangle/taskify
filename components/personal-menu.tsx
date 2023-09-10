"use client"
import { 
  FaBell,  
  FaEnvelope,
  FaUserCircle, 
 } from "react-icons/fa";

 import { signOut, useSession } from "next-auth/react";

 import Link from "next/link"

const PersonalMenu = () => {
  const session = useSession();

  const handleSignOut = () => {
    signOut();
  }

  return (
    <div className="flex gap-2 items-center">
      {session.status === "authenticated" ? (
        <div>
      <FaBell size={20}/>
      <FaEnvelope size={20}/>
      <FaUserCircle size={25}/>
      <button onClick={handleSignOut}>signOut</button>
        </div>
      ) : (
        <Link href={"/sign-in"}>
        Sign In
      </Link>
      )}
    </div>
  )
}

export default PersonalMenu;