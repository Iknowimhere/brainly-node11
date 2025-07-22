import ProtectedComponent from "./components/ProtectedComponent"
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import Singup from "./pages/Singup"
import Welcome from "./pages/Welcome"
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/signup" element={<Singup/>}/>
        <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<ProtectedComponent>
            <Dashboard/>
            </ProtectedComponent>
          }/>
      </Routes>
  )
}
export default App