import React from "react";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { search } from "../actions/Actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Navigation extends React.Component {
  state = {
    query: "",
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.dispatch(search({ search: this.state.query }));
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">Team Scotti</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/add_coverages">Add Coverages</Nav.Link>
              <Nav.Link href="/">Metrics</Nav.Link>
              <NavDropdown title="Database" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/coverages">Coverages</NavDropdown.Item>
                <NavDropdown.Item href="/sports">Sports</NavDropdown.Item>
                <NavDropdown.Item href="/leagues">Leagues</NavDropdown.Item>
                <NavDropdown.Item href="/clubs">Clubs</NavDropdown.Item>
                <NavDropdown.Item href="/groups">Groups</NavDropdown.Item>
                <NavDropdown.Item href="/categories">
                  Categories
                </NavDropdown.Item>
                <NavDropdown.Item href="/carriers">Carriers</NavDropdown.Item>
                <NavDropdown.Item href="/companies">Companies</NavDropdown.Item>
                <NavDropdown.Item href="/users">Users</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
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
        </Navbar>
      </>
    );
  }
}

export default connect()(Navigation);
