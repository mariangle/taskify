"use client"

import { Button } from "@nextui-org/react"
import AuthService from "@/helpers/services/auth-service"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const authService = new AuthService(); 

const LogoutButton = () => {
    const router = useRouter();

    const onLogout = () => {
        try {
            authService.logout();
            router.refresh();
            toast.success('Succesfully logged out.')
        } catch (err: any){
            alert(err?.message)
        }
    }

  return (
    <Button variant="solid" onClick={onLogout} fullWidth>Logout</Button>
  )
}

export default LogoutButton
