import React, { useEffect, lazy, Suspense } from 'react'
import FrontNavbar from './components/Navbar/FrontNavbar'
import { Footer } from './components/Footer/Footer'
import BackstageNavbar from './components/Navbar/BackstageNavbar'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const GivingsPage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./pages/GivingsPage')), 5000)
  })
})
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
const ManageFaqPageAdd = lazy(() => import('./pages/ManageFaqPageAdd'))
const ManageFaqPageEdit = lazy(() => import('./pages/ManageFaqPageEdit'))
const ManageGivingPage = lazy(() => import('./pages/ManageGivingPage'))

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const Home = () => {
  return (
    <>
      <FrontNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/about" component={AboutPage} />
        <Route exact path="/givings" component={GivingsPage} />
        <Route path="/givings/add" component={AddGiftPage} />
        <Route path="/givings/edit" component={EditGiftsPage} />
        <Route exact strict path="/givings/:id" component={ItemPage} />
        <Route exact path="/portfolio" component={PortfolioPage} />
        <Route path="/portfolio/edit" component={EditPortfolioPage} />
        <Route exact path="/transactions" component={TransactionsPage} />
        <Route path="/transactions/detail" component={TransactionsDetailPage} />
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
        <Route path="/backstage/faq/add" component={ManageFaqPageAdd} />
        <Route path="/backstage/faq/edit" component={ManageFaqPageEdit} />
        <Route path="/backstage/giving" component={ManageGivingPage} />
        <Redirect from="*" to="/backstage/member" />
      </Switch>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <Switch>
          <Route path="/backstage" component={Backstage} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  )
}
