import PageLayout from "@/components/page-layout"
import AuthForm from "../components/auth-form"

import Link from "next/link"

export default function Login(){
    return (
        <PageLayout>
            <AuthForm variant="login"/>
            <Link href="/register">Register instead.</Link>
        </PageLayout>
    )
}