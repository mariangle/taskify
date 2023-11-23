import PageLayout from "@/components/ui/page-layout"
import AuthForm from "../components/auth-form"

import Link from "next/link"

export default function Register(){
    return (
        <PageLayout>
            <AuthForm variant="register"/>
            <Link href="/login">login instead.</Link>
        </PageLayout>
    )
}