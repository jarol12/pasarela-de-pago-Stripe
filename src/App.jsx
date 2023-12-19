import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoutes/users'
import Pay from './views/pay/pay'
import Home from './views/home/home'
import Register from './views/auth/register/register'
import Login  from './views/auth/login/login'
import Success from './views/pay/sucess'
import Failure from './views/pay/failure'

function App() {

 

  return (
    <Routes>
       <Route path='' element={<Home/>}/>
       <Route path='orderSummary' element={<Pay/>} />
       <Route path='login' element={<Login/>} />
       <Route path='register' element={<Register/>} />
       <Route path='pay/failure' element={<Failure/>} />
       <Route path='pay/success' element={<Success/>} />
    </Routes>
  )
}

export default App
