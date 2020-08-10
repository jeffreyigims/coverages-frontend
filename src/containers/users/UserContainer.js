import React, { Component } from "react";
import { connect } from "react-redux";
import UserDetails from "./UserDetails";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { EyeFill } from "react-bootstrap-icons";
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
          defaultActivePage={this.props.defaultActivePage}
          totalPages={this.props.totalPages}
        />
      </>
    );
  };

  render() {
    const { dispatch } = this.props;
    return (
      <>
        <UserDetails
          {...this.props}
          name={this.state.name}
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            dispatch(updateUser({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            dispatch(deleteUser(id));
          }}
        />
      </>
    );
  }
}

UserContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
  coverages: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPages: PropTypes.number,
  defaultActivePage: PropTypes.number.isRequired,
  coveragesStatus: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { selected, status } = state.users;
  const { coverages, totalPages, defaultActivePage } = state.coverages;
  const coveragesStatus = state.coverages.status;
  const redirections = state.redirections;
  return {
    selected,
    status,
    redirections,
    coverages,
    defaultActivePage,
    totalPages,
    coveragesStatus,
  };
}

export default connect(mapStateToProps)(UserContainer);
