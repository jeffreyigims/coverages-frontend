import React, { Component } from "react";
import { connect } from "react-redux";
import UserDetails from "./UserDetails";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { EyeFill } from "react-bootstrap-icons";
import { users as formHelpers } from "../../utils/Schemas";
import { userForm as form } from "../../utils/Forms";
import {
  fetchUser,
  updateUser,
  deleteUser,
  fetchCoverages,
} from "../../actions/Actions";
import PaginatedTable from "../../components/PaginatedTable";
import { Button } from "react-bootstrap";

class UserContainer extends Component {
  state = {
    name: "user",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchUser(this.state.id));
    this.props.dispatch(fetchCoverages({ for_user: this.state.id }));
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/leagues/" + object.attributes.league.id}
                style={{ color: "black" }}
              >
                {object.attributes.league.name}
              </Button>
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/clubs/" + object.attributes.club.id}
                style={{ color: "black" }}
              >
                {object.attributes.club.name}
              </Button>
            </td>
            <td width="200" align="left">
              {object.attributes.group.name}
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/categories/" + object.attributes.category.id}
                style={{ color: "black" }}
              >
                {object.attributes.category.name}
              </Button>
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/sub_categories/" + object.attributes.sub_category.id}
                style={{ color: "black" }}
              >
                {object.attributes.sub_category.name}
              </Button>
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/users/" + object.attributes.user.id}
                style={{ color: "black" }}
              >
                {object.attributes.user.first_name}{" "}
                {object.attributes.user.last_name}
              </Button>
            </td>
            <td width="200" align="left">
              <Moment format="MM/DD/YYYY">
                {object.attributes.created_at}
              </Moment>
            </td>
            <td width="200" align="left">
              <Moment format="MM/DD/YYYY">
                {object.attributes.updated_at}
              </Moment>
            </td>
            <td width="200" align="left">
              {object.attributes.verified ? "true" : "false"}
            </td>
            <td width="100" align="center">
              <Button
                variant="link"
                href={"/coverages/" + object.attributes.id}
                style={{ color: "black" }}
              >
                <EyeFill />
              </Button>
            </td>
          </tr>
        );
      });
    };

    return (
      <>
        <PaginatedTable
          objects={this.props.coverages}
          showObjects={showObjects}
          tableHeaders={[
            "League",
            "Club",
            "Group",
            "Category",
            "Sub",
            "Entered By",
            "Date Created",
            "Last Updated",
            "Verified",
            "View",
          ]}
          status={this.props.coveragesStatus}
          onPageChange={(e, { activePage }) =>
            this.props.dispatch(
              fetchCoverages({ for_user: this.state.id, page: activePage })
            )
          }
          defaultActivePage={this.props.page}
          totalPages={this.props.pages}
        />
      </>
    );
  };

  render() {
    return (
      <>
        <UserDetails
          object={this.props.selected}
          secondary={this.props.coverages}
          status={this.props.status}
          name={this.state.name}
          formHelpers={formHelpers}
          form={form}
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            this.props.dispatch(updateUser({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteUser(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

UserContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  errors: PropTypes.object,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.users;
  const { coverages, pages, page } = state.coverages;
  const coveragesStatus = state.coverages.status;
  const { link, redirect } = state.redirections;
  return {
    selected,
    status,
    error,
    link,
    redirect,
    coverages,
    pages,
    page,
    coveragesStatus,
  };
}

export default connect(mapStateToProps)(UserContainer);
