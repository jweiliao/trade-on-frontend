import React from 'react'
import FrontNavbar from './components/Navbar/FrontNavbar'
import Footer from './pages/Footer'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
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
import ManageGivingPage from './pages/ManageGivingPage'

const PageContainer = styled.div`
  padding-top: 64px;
`

export default function App() {
  return (
    <Router>
      <PageContainer>
        <Switch>
          <Route exact path="/">
            <FrontNavbar />
            <HomePage />
            <Footer />
          </Route>
          <Route path="/login">
            <FrontNavbar />
            <LoginPage />
          </Route>
          <Route path="/register">
            <FrontNavbar />
            <RegisterPage />
          </Route>
          <Route path="/about">
            <FrontNavbar />
            <AboutPage />
            <Footer />
          </Route>
          <Route path="/givings">
            <FrontNavbar />
            <GivingsPage />
            <Footer />
          </Route>
          <Route exact path="/givings/:id">
            <FrontNavbar />
            <ItemPage />
            <Footer />
          </Route>
          <Route path="/givings/add">
            <FrontNavbar />
            <AddGiftPage />
            <Footer />
          </Route>
          <Route path="/givings/edit">
            <FrontNavbar />
            <EditGiftsPage />
            <Footer />
          </Route>
          <Route path="/portfolio">
            <FrontNavbar />
            <PortfolioPage />
          </Route>
          <Route path="/portfolio/edit">
            <FrontNavbar />
            <EditPortfolioPage />
          </Route>
          <Route path="/transactions">
            <FrontNavbar />
            <TransactionsPage />
          </Route>
          <Route path="/transactions/detail">
            <FrontNavbar />
            <TransactionsDetailPage />
          </Route>
          <Route path="/faq">
            <FrontNavbar />
            <FaqPage />
            <Footer />
          </Route>
          <Route path="/privacy">
            <FrontNavbar />
            <PrivacyPage />
            <Footer />
          </Route>
          <Route path="/terms">
            <FrontNavbar />
            <TermsPage />
            <Footer />
          </Route>
          <Route path="/backstage">
            <BackstagePage />
          </Route>
          <Route path="/backstage/member">
            <ManageMemberPage />
          </Route>
          <Route path="/backstage/category">
            <ManageCategoryPage />
          </Route>
          <Route path="/backstage/faq">
            <ManageFaqPage />
          </Route>
          <Route path="/backstage/giving">
            <ManageGivingPage />
          </Route>
        </Switch>
      </PageContainer>
    </Router>
  )
}
