interface props {
    children: React.ReactNode
}

const PageLayout: React.FC<props> = ({
    children
}) => {
  return (
    <div className="min-h-screen py-8">
        {children}
    </div>
  )
}

export default PageLayout