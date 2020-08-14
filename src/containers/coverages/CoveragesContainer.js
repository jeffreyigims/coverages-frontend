import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import { displayDate } from "../../utils/Helpers";
import {
  fetchCoverages,
  fetchClubs,
  fetchCategories,
  fetchCarriers,
  fetchBrokers,
  postCoverageAssociations,
} from "../../actions/Actions";

class CoveragesContainer extends Component {
  state = {
    tableHeaders: [
      "League",
      "Club",
      "Group",
      "Category",
      "Sub",
      "Entered By",
      "Date Created",
      "Last Updated",
      "Coverage Line",
      "Verified",
      "View",
    ],
    name: "coverage",
    plural: "coverages",
  };

  componentDidMount() {
    this.props.dispatch(fetchCoverages());
    this.props.dispatch(fetchClubs());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchCarriers());
    this.props.dispatch(fetchBrokers());
  }

  showObjects = (objects) => {
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
            {displayDate(object.attributes.created_at, "MM/DD/YYYY")}
          </td>
          <td width="200" align="left">
            {displayDate(object.attributes.updated_at, "MM/DD/YYYY")}
          </td>
          <td width="100" align="left">
            {object.attributes.has_coverage_line}
          </td>
          <td width="100" align="left">
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

  postObject = (values) => {
    const new_object = {
      club_group_id: this.props.clubs[values.club_index].attributes.club_groups[
        values.group_index
      ].data.attributes.id,
      sub_category_id: this.props.categories[values.category_index].attributes
        .sub_categories[values.sub_category_index].data.attributes.id,
      notes: values.notes,
      start_date: values.start_date,
      end_date: values.end_date,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    let carriers = values.carriers.map(
      (carrier_index) => this.props.carriers[carrier_index].attributes.id
    );
    let brokers = values.brokers.map(
      (broker_index) => this.props.brokers[broker_index].attributes.id
    );
    this.props.dispatch(
      postCoverageAssociations(new_object, carriers, brokers)
    );
  };

  render() {
    const {
      coverages,
      clubs,
      categories,
      carriers,
      brokers,
      dispatch,
      ...otherProps
    } = this.props;
    return (
      <>
        <ListStructure
          {...otherProps}
          objects={this.props.coverages}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          postObject={this.postObject}
          onPageChange={(e, { activePage }) =>
            dispatch(fetchCoverages({ page: activePage }))
          }
          additional={{
            clubs: clubs,
            categories: categories,
            carriers: carriers,
            brokers: brokers,
          }}
        />
      </>
    );
  }
}

CoveragesContainer.propTypes = {
  coverages: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  defaultActivePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  clubs: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  carriers: PropTypes.arrayOf(PropTypes.object).isRequired,
  brokers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { coverages, defaultActivePage, totalPages, status } = state.coverages;
  const { clubs } = state.clubs;
  const { categories } = state.categories;
  const { carriers } = state.carriers;
  const { brokers } = state.brokers;
  return {
    coverages,
    clubs,
    categories,
    carriers,
    brokers,
    defaultActivePage,
    totalPages,
    status,
  };
}

export default connect(mapStateToProps)(CoveragesContainer);
