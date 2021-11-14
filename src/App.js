import React from 'react'
import FrontNavbar from './components/Navbar/FrontNavbar'
import { Footer } from './components/Footer/Footer'
import BackstageNavbar from './components/Navbar/BackstageNavbar'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AboutPage from './pages/AboutPage'
import GivingsPage from './pages/GivingsPage'
import ItemPage from './pages/ItemPage'
import AddGiftPage from './pages/AddGiftPage'
import EditGiftsPage from './pages/EditGiftsPage'
import PortfolioPage from './pages/PortfolioPage'
import EditPortfolioPage from './pages/EditPortfolioPage'
import TransactionsPage from './pages/TransactionsPage'
import TransactionsDetailPage from './pages/TransactionsDetailPage'
import FaqPage from './pages/FaqPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import BackstagePage from './pages/BackstagePage'
import ManageMemberPage from './pages/ManageMemberPage'
import ManageCategoryPage from './pages/ManageCategoryPage'
import ManageFaqPage from './pages/ManageFaqPage'
import ManageFaqPageAdd from './pages/ManageFaqPageAdd'
import ManageFaqPageEdit from './pages/ManageFaqPageEdit'
import ManageGivingPage from './pages/ManageGivingPage'

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
        <Route exact path="/backstage" component={BackstagePage} />
        <Route path="/backstage/member" component={ManageMemberPage} />
        <Route path="/backstage/category" component={ManageCategoryPage} />
        <Route exact path="/backstage/faq" component={ManageFaqPage} />
        <Route path="/backstage/faq/add" component={ManageFaqPageAdd} />
        <Route path="/backstage/faq/edit" component={ManageFaqPageEdit} />
        <Route path="/backstage/giving" component={ManageGivingPage} />
      </Switch>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/backstage" component={Backstage} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}
