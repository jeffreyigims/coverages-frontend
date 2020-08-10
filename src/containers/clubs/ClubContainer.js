import React, { Component } from "react";
import { connect } from "react-redux";
import ClubDetails from "./ClubDetails";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { EyeFill } from "react-bootstrap-icons";
import PaginatedTable from "../../components/PaginatedTable";
import {
  fetchClub,
  updateClub,
  deleteClub,
  fetchCoverages,
  fetchLeagues,
  fetchGroups,
  postClubGroup,
} from "../../actions/Actions";

class ClubContainer extends Component {
  state = {
    name: "club",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchClub(this.state.id));
    this.props.dispatch(fetchLeagues());
    this.props.dispatch(fetchGroups());
    this.props.dispatch(fetchCoverages({ for_club: this.state.id }));
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
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
            "Group",
            "Category",
            "Sub",
            "Entered By",
            "Date Created",
            "Last Updated",
            "Verified",
            "View",
          ]}
          status={this.props.status}
          onPageChange={(e, { activePage }) =>
            this.props.dispatch(
              fetchCoverages({ for_carrier: this.state.id, page: activePage })
            )
          }
          defaultActivePage={this.props.defaultActivePage}
          totalPages={this.props.totalPages}
        />
      </>
    );
  };

  render() {
    const { groups, dispatch } = this.props;
    return (
      <>
        <ClubDetails
          {...this.props}
          name={"club"}
          postObject={(values) =>
            dispatch(
              postClubGroup({
                club_id: this.state.id,
                group_id: groups[values.group_index].attributes.id,
              })
            )
          }
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            dispatch(updateClub({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            dispatch(deleteClub(id));
          }}
        />
      </>
    );
  }
}

ClubContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
  coverages: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPages: PropTypes.number,
  defaultActivePage: PropTypes.number.isRequired,
  coveragesStatus: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { selected, status } = state.clubs;
  const { coverages, totalPages, defaultActivePage } = state.coverages;
  const { groups } = state.groups;
  const { leagues } = state.leagues;
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
    groups,
    leagues,
  };
}

export default connect(mapStateToProps)(ClubContainer);
