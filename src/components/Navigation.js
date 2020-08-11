import React from "react";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { search, logout } from "../actions/Actions";
import PropTypes from "prop-types";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import SearchResults from "./SearchResults";
import { switchModal } from "../utils/Helpers";

class Navigation extends React.Component {
  constructor() {
    super();
    this.switchModal = switchModal.bind(this);
  }

  state = {
    query: "",
    show_search: false,
    modal_name: "show_search",
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.dispatch(search({ search: this.state.query }));
    this.switchModal(this.state.modal_name);
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  logout = (e) => {
    e.preventDefault();
    this.props.dispatch(logout());
    this.props.push("/");
  };

  render() {
    const { logged } = this.props;
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          {logged ? (
            <>
              <Navbar.Brand href="/coverages">Team Scotti</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/add_coverages">Add Coverages</Nav.Link>
                  <Nav.Link href="/metrics">Metrics</Nav.Link>
                  <NavDropdown title="Database" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/coverages">
                      Coverages
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/sports">Sports</NavDropdown.Item>
                    <NavDropdown.Item href="/leagues">Leagues</NavDropdown.Item>
                    <NavDropdown.Item href="/clubs">Clubs</NavDropdown.Item>
                    <NavDropdown.Item href="/groups">Groups</NavDropdown.Item>
                    <NavDropdown.Item href="/categories">
                      Categories
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/carriers">
                      Carriers
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/companies">
                      Companies
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
              </Nav>
              <Form inline>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={this.handleChange}
                />
                <Button
                  onClick={(e) => this.handleSearch(e)}
                  variant="outline-primary"
                  type="submit"
                >
                  Search
                </Button>
              </Form>
            </>
          ) : (
            <Navbar.Brand href="/">Team Scotti</Navbar.Brand>
          )}
        </Navbar>
        <SearchResults
          show={this.state.show_search}
          switchModal={() => this.switchModal(this.state.modal_name)}
          query={this.state.query}
        />
      </>
    );
  }
}

Navigation.propTypes = {
  logged: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { logged } = state.authentication;
  return {
    logged,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (link) => dispatch(push(link)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
