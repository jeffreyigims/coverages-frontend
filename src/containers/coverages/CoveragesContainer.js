import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { EyeFill } from "react-bootstrap-icons";
import { coverages as formHelpers } from "../../utils/Schemas";
import { coverageForm as form } from "../../utils/Forms";
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
            <Moment format="MM/DD/YYYY">{object.attributes.created_at}</Moment>
          </td>
          <td width="200" align="left">
            <Moment format="MM/DD/YYYY">{object.attributes.updated_at}</Moment>
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
    return (
      <>
        <ListStructure
          objects={this.props.coverages}
          status={this.props.status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          formHelpers={formHelpers}
          form={(values, handleChange, setFieldValue, errors) =>
            form(
              values,
              handleChange,
              setFieldValue,
              errors,
              this.props.clubs,
              this.props.categories,
              this.props.carriers,
              this.props.brokers
            )
          }
          postObject={(values) => this.postObject(values)}
          onPageChange={(e, { activePage }) =>
            this.props.dispatch(fetchCoverages({ page: activePage }))
          }
          defaultActivePage={this.props.page}
          totalPages={this.props.pages}
        />
      </>
    );
  }
}

CoveragesContainer.propTypes = {
  coverages: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { coverages, page, pages, status, error } = state.coverages;
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
    page,
    pages,
    status,
    error,
  };
}

export default connect(mapStateToProps)(CoveragesContainer);
