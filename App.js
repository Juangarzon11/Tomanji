import Navigation from "./src/Navigation"
import StoreProvider from "./src/store/StoreProvider"

export default function App() {
  return (
    <StoreProvider>
      <Navigation />
    </StoreProvider>
  )
}