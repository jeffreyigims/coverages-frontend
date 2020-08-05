import React from "react";
import { Provider } from "react-redux";
import configureStore from "../ConfigureStore";
import SportsContainer from "./sports/SportsContainer";
import SportContainer from "./sports/SportContainer";
import LeaguesContainer from "./leagues/LeaguesContainer";
import LeagueContainer from "./leagues/LeagueContainer";
import ClubsContainer from "./clubs/ClubsContainer";
import ClubContainer from "./clubs/ClubContainer";
import GroupsContainer from "./groups/GroupsContainer";
import GroupContainer from "./groups/GroupContainer";
import CategoriesContainer from "./categories/CategoriesContainer";
import CategoryContainer from "./categories/CategoryContainer";
import CarriersContainer from "./carriers/CarriersContainer";
import CarrierContainer from "./carriers/CarrierContainer";
import CompaniesContainer from "./companies/CompaniesContainer";
import CompanyContainer from "./companies/CompanyContainer";
import UsersContainer from "./users/UsersContainer";
import UserContainer from "./users/UserContainer";
import CoveragesContainer from "./coverages/CoveragesContainer";
import CoverageContainer from "./coverages/CoverageContainer";
import BrokerContainer from "./brokers/BrokerContainer";
import SubCategoryContainer from "./sub_categories/SubCategoryContainer";
import CoverageWizardContainer from "./coverage_wizard/CoverageWizardContainer";
import AlertsContainer from "./AlertsContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Row, Col, Container } from "react-bootstrap";
import Navigation from "../components/Navigation";

const store = configureStore();

export default class Root extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <Navigation />
          <AlertsContainer />
          <Router>
            <Route path="/sports" exact component={SportsContainer} />
            <Route path="/sports/:id" exact component={SportContainer} />
            <Route path="/leagues" exact component={LeaguesContainer} />
            <Route path="/leagues/:id" exact component={LeagueContainer} />
            <Route path="/clubs" exact component={ClubsContainer} />
            <Route path="/clubs/:id" exact component={ClubContainer} />
            <Route path="/groups" exact component={GroupsContainer} />
            <Route path="/groups/:id" exact component={GroupContainer} />
            <Route path="/categories" exact component={CategoriesContainer} />
            <Route path="/categories/:id" exact component={CategoryContainer} />
            <Route path="/carriers" exact component={CarriersContainer} />
            <Route path="/carriers/:id" exact component={CarrierContainer} />
            <Route path="/companies" exact component={CompaniesContainer} />
            <Route path="/companies/:id" exact component={CompanyContainer} />
            <Route path="/users" exact component={UsersContainer} />
            <Route path="/users/:id" exact component={UserContainer} />
            <Route path="/coverages" exact component={CoveragesContainer} />
            <Route path="/coverages/:id" exact component={CoverageContainer} />
            <Route path="/brokers/:id" exact component={BrokerContainer} />
            <Route path="/sub_categories/:id" exact component={SubCategoryContainer} />
            <Route path="/coverage_wizard" exact component={CoverageWizardContainer} />
          </Router>
        </Provider>
      </>
    );
  }
}
