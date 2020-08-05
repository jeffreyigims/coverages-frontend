import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default class Navigation extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Team Scotti</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Add Coverages</Nav.Link>
            <Nav.Link href="/">Metrics</Nav.Link>
            <NavDropdown title="Database" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/coverages">Coverages</NavDropdown.Item>
              <NavDropdown.Item href="/sports">Sports</NavDropdown.Item>
              <NavDropdown.Item href="/leagues">Leagues</NavDropdown.Item>
              <NavDropdown.Item href="/clubs">Clubs</NavDropdown.Item>
              <NavDropdown.Item href="/groups">Groups</NavDropdown.Item>
              <NavDropdown.Item href="/categories">Categories</NavDropdown.Item>
              <NavDropdown.Item href="/carriers">Carriers</NavDropdown.Item>
              <NavDropdown.Item href="/companies">Companies</NavDropdown.Item>
              <NavDropdown.Item href="/users">Users</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
