import Navbar from './_components/navbar'
import Footer from './_components/footer'

interface PageProps {
  children: React.ReactNode
}

export default function Layout({ children }: PageProps) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
