import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import PaginatedTable from "../../components/PaginatedTable";
import { users as formHelpers } from "../../utils/Schemas";
import { userForm as form } from "../../utils/Forms";
import { fetchUser, updateUser, deleteUser, fetchCoverages } from "../../actions/Actions";

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
              {object.attributes.start_date}
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
                {/* <EyeFill /> */}
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
          tableHeaders={["Club", "Group", "Start", "Verified", "View"]}
          onPageChange={(e, { activePage }) =>
            this.props.dispatch(
              fetchCoverages({ for_carrier: this.state.id, page: activePage })
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
        <DetailStructure
          object={this.props.selected}
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
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect, coverages, pages, page };
}

export default connect(mapStateToProps)(UserContainer);
