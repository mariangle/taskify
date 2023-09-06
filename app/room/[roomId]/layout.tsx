import RoomNavbar from "./components/room-navbar"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        <RoomNavbar />
        {children}
      </div>
    )
  }
  