import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "../ConfigureStore";
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
import AddCoverages from "./coverages/AddCoverages";
import AlertsContainer from "./AlertsContainer";
import MetricsContainer from "./metrics/MetricsContainer";
import LoginContainer from "./authentication/LoginContainer";
import { Route } from "react-router-dom";
import Navigation from "../components/Navigation";

const store = configureStore();

export default class Root extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Navigation />
            <AlertsContainer />
            <Route path="/" exact component={LoginContainer} />

            <Route path="/add_coverages" exact component={AddCoverages} />
            <Route path="/metrics" exact component={MetricsContainer} />

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
            <Route
              path="/sub_categories/:id"
              exact
              component={SubCategoryContainer}
            />
            <Route path="/carriers" exact component={CarriersContainer} />
            <Route path="/carriers/:id" exact component={CarrierContainer} />

            <Route path="/companies" exact component={CompaniesContainer} />
            <Route path="/companies/:id" exact component={CompanyContainer} />
            <Route path="/brokers/:id" exact component={BrokerContainer} />

            <Route path="/users" exact component={UsersContainer} />
            <Route path="/users/:id" exact component={UserContainer} />

            <Route path="/coverages" exact component={CoveragesContainer} />
            <Route path="/coverages/:id" exact component={CoverageContainer} />
          </ConnectedRouter>
        </Provider>
      </>
    );
  }
}
