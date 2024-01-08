import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes,Navigate,BrowserRouter } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/auth/Login'))
const Register = React.lazy(() => import('./views/pages/register/RegisterPage 1'))
const Select_Adveriser = React.lazy(() => import('./views/pages/register/advertiserselectPage'))
const Select_Publisher = React.lazy(() => import('./views/pages/register/publisherselectPage'))
import InternalselectPage from './views/pages/register/InternalselectPage'
// const Select_Internal = React.lazy(() => import('./views/pages/register/internalselectPage'))

const Home = React.lazy(() => import('./views/Home/index'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/selectAdvertiser" name="Select Advertiser Page" element={<Select_Adveriser />} />
            <Route exact path="/selectPublisher" name="Select Publisher Page" element={<Select_Publisher />} />
            <Route exact path="/selectInternal" name="Select Internal Page" element={<InternalselectPage />} />
            
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
            
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
