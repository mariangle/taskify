import PageLayout from "@/components/ui/page-layout"
import WidthContainer from "@/components/ui/width-container"

import AuthForm from "../components/auth-form"

import Link from "next/link"

export default function Login(){
    return (
        <PageLayout>
            <WidthContainer>
                <AuthForm variant="login"/>
                <Link href="/register">Register instead.</Link>
            </WidthContainer>
        </PageLayout>
    )
}