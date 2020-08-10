import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import Moment from "react-moment";
import { EyeFill } from "react-bootstrap-icons";
import {
  fetchSubCategory,
  deleteSubCategory,
  updateSubCategory,
  fetchCoverages,
} from "../../actions/Actions";

class SubCategoryContainer extends Component {
  state = {
    name: "sub category",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchSubCategory(this.state.id));
    this.props.dispatch(fetchCoverages({ for_sub_category: this.state.id }));
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
                {object.attributes.user.first_name}
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
      <GeneralTable
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
      />
    );
  };

  render() {
    const { dispatch } = this.props;
    return (
      <>
        <DetailStructure
          {...this.props}
          name={this.state.name}
          showDetails={this.showDetails}
          deleteObject={(id) => {
            dispatch(deleteSubCategory(id));
          }}
          updateObject={(id, values) => {
            dispatch(updateSubCategory({ id: id, values: values }));
          }}
          additional={{ selected: this.props.selected }}
        />
      </>
    );
  }
}

SubCategoryContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
  coverages: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPages: PropTypes.number,
  defaultActivePage: PropTypes.number.isRequired,
  coveragesStatus: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { selected, status } = state.sub_categories;
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

export default connect(mapStateToProps)(SubCategoryContainer);
