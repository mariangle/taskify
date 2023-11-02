import PageLayout from "@/components/ui/page-layout"
import WidthContainer from "@/components/ui/width-container"

import AuthForm from "../components/auth-form"

import Link from "next/link"

export default function Register(){
    return (
        <PageLayout>
            <WidthContainer>
                <AuthForm variant="register"/>
                <Link href="/login">login instead.</Link>
            </WidthContainer>
        </PageLayout>
    )
}