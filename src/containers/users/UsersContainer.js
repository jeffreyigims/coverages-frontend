import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { fetchUsers, postUser } from "../../actions/Actions";

class UsersContainer extends Component {
  state = {
    tableHeaders: ["Name", "Role", "Username", "Club"],
    name: "user",
    plural: "users",
  };

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/" + this.state.plural + "/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.role}
          </td>
          <td width="200" align="left">
            {object.attributes.username}
          </td>
          <td width="200" align="left">
            {object.attributes.club.name || "N/A"}
          </td>
        </tr>
      );
    });
  };

  postObject = (values) => {
    const new_object = {
      first_name: values.first_name,
      last_name: values.last_name,
      role: values.role,
      username: values.username,
      password: "secret",
      password_confirmation: "secret",
    };
    this.props.dispatch(postUser(new_object));
  };

  render() {
    const { users, status } = this.props;
    return (
      <>
        <ListStructure
          objects={users}
          status={status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          postObject={this.postObject}
        />
      </>
    );
  }
}

UsersContainer.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { users, status } = state.users;
  return { users, status };
}

export default connect(mapStateToProps)(UsersContainer);
