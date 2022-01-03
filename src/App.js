import React, { useEffect, useState, useContext, lazy, Suspense } from 'react'
import AuthContext from './contexts'
import Navbar from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import BackstageNavbar from './components/Navbar/BackstageNavbar'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { getMe } from './WebAPI'
import { getAuthToken, setAuthToken } from './utils'
import Loading from './components/Loading'
import jwt_decode from 'jwt-decode'
const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const GivingsPage = lazy(() => import('./pages/GivingsPage'))
const ItemPage = lazy(() => import('./pages/ItemPage'))
const AddGiftPage = lazy(() => import('./pages/AddGiftPage'))
const EditGiftsPage = lazy(() => import('./pages/EditGiftsPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const EditPortfolioPage = lazy(() => import('./pages/EditPortfolioPage'))
const TransactionsPage = lazy(() => import('./pages/TransactionsPage'))
const TransactionsDetailPage = lazy(() =>
  import('./pages/TransactionsDetailPage')
)
const FaqPage = lazy(() => import('./pages/FaqPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const ManageMemberPage = lazy(() => import('./pages/ManageMemberPage'))
const ManageCategoryPage = lazy(() => import('./pages/ManageCategoryPage'))
const ManageFaqPage = lazy(() => import('./pages/ManageFaqPage'))
const ManageGivingPage = lazy(() => import('./pages/ManageGivingPage'))

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const Home = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/about" component={AboutPage} />
        <Route exact path="/givings" component={GivingsPage} />
        {user && <Route path="/givings/add" component={AddGiftPage} />}
        {user && <Route path="/givings/edit" component={EditGiftsPage} />}
        <Route exact strict path="/givings/:id" component={ItemPage} />
        {user && <Route path="/portfolio/edit" component={EditPortfolioPage} />}
        <Route exact path="/portfolio/:id" component={PortfolioPage} />
        <Route exact path="/portfolio" component={PortfolioPage} />
        {user && (
          <Route exact path="/transactions" component={TransactionsPage} />
        )}
        {user && (
          <Route path="/transactions/:id" component={TransactionsDetailPage} />
        )}
        <Route path="/faq" component={FaqPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Redirect from="*" to="/" />
      </Switch>
      <Footer />
    </>
  )
}

const Backstage = () => {
  return (
    <>
      <BackstageNavbar />
      <Switch>
        <Route path="/backstage/member" component={ManageMemberPage} />
        <Route path="/backstage/category" component={ManageCategoryPage} />
        <Route exact path="/backstage/faq" component={ManageFaqPage} />
        <Route path="/backstage/giving" component={ManageGivingPage} />
        <Redirect from="*" to="/backstage/member" />
      </Switch>
    </>
  )
}

export default function App() {
  const [user, setUser] = useState(
    (getAuthToken() && jwt_decode(getAuthToken()).sub) || null
  )

  useEffect(() => {
    const fetchUser = async () => {
      if (getAuthToken()) {
        try {
          const { data } = await getMe()
          if (data.error) {
            setUser(null)
            setAuthToken('')
            return
          }
          setUser(data.userInfo)
        } catch (err) {
          console.log(err.response)
          setUser(null)
          setAuthToken('')
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            {user && user.accountAuthority === 'admin' && (
              <Route path="/backstage" component={Backstage} />
            )}
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Suspense>
    </AuthContext.Provider>
  )
}
