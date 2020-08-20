import React, { Component } from "react";
import { connect } from "react-redux";
import CoveragesTable from "./CoveragesTable";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { displayDate } from "../../utils/Helpers";
import {
  fetchCoverages,
  updateCoverage,
  fetchClubs,
  fetchCategories,
  fetchCarriers,
  fetchBrokers,
  fetchGroups,
  postCoverageAssociations,
} from "../../actions/Actions";

class CoveragesContainer extends Component {
  state = {
    name: "coverage",
    plural: "coverages",
    orders: [
      { Name: "Most Recent", Scope: "most_recent" },
      { Name: "Recently Updated", Scope: "most_recently_updated" },
      { Name: "End Date", Scope: "end_date" },
      { Name: "Start Date", Scope: "start_date" },
    ],
    verified: "All",
  };

  componentDidMount() {
    this.props.dispatch(fetchCoverages());
    this.props.dispatch(fetchClubs());
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchCarriers());
    this.props.dispatch(fetchBrokers());
    this.props.dispatch(fetchGroups());
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
          {this.verifiedColumn(object, this.state.verified)}
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

  verifiedColumn = (object, verified) => {
    switch (verified) {
      case "verified":
        return (
          <td width="100" align="center">
            <Button
              variant="link"
              onClick={(event) =>
                this.props.dispatch(
                  updateCoverage({
                    id: object.attributes.id,
                    values: { verified: false },
                  })
                )
              }
              style={{ color: "black" }}
            >
              <ExclamationCircleFill />
            </Button>
          </td>
        );
      case "unverified":
        return (
          <td width="100" align="center">
            <Button
              variant="link"
              onClick={(event) =>
                this.props.dispatch(
                  updateCoverage({
                    id: object.attributes.id,
                    values: { verified: true },
                  })
                )
              }
              style={{ color: "black" }}
            >
              <ExclamationCircleFill />
            </Button>
          </td>
        );
      default:
        return (
          <td width="100" align="left">
            {object.attributes.verified ? "true" : "false"}
          </td>
        );
    }
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

  filterCoverages = (values) => {
    var subs = [];
    var filters = {};
    const { groups, categories } = this.props;
    if (values.group_index !== "-1") {
      filters["for_group"] = groups[values.group_index].attributes.id;
    }
    if (values.category_index === "-1") {
      subs = categories
        .map((object) => object.attributes.sub_categories)
        .flat();
    } else {
      let category = categories[values.category_index];
      filters["for_category"] = category.attributes.id;
      subs = category.attributes.sub_categories;
    }
    if (values.sub_category_index !== "-1") {
      filters["for_sub_category"] =
        subs[values.sub_category_index].data.attributes.id;
    }
    if (values.order_index !== "-1") {
      filters[this.state.orders[values.order_index].Scope] = true;
    }
    if (values.has_coverage_line !== "-1") {
      filters["has_coverage_line"] = values.has_coverage_line;
    }
    if (values.verified !== "-1") {
      filters[values.verified] = true;
      this.setState({ verified: values.verified });
    } else {
      this.setState({ verified: "All" });
    }
    this.props.dispatch(fetchCoverages(filters));
  };

  tableHeaders = (verified) => {
    var header;
    switch (verified) {
      case "verified":
        header = "Unverify";
        break;
      case "unverified":
        header = "Verify";
        break;
      default:
        header = "Verified";
        break;
    }
    return [
      "League",
      "Club",
      "Group",
      "Category",
      "Sub",
      "Entered By",
      "Date Created",
      "Last Updated",
      "Coverage Line",
      header,
      "View",
    ];
  };

  render() {
    const {
      coverages,
      clubs,
      groups,
      categories,
      carriers,
      brokers,
      dispatch,
      ...otherProps
    } = this.props;
    return (
      <>
        <CoveragesTable
          {...otherProps}
          objects={this.props.coverages}
          showObjects={this.showObjects}
          tableHeaders={this.tableHeaders(this.state.verified)}
          name={this.state.name}
          plural={this.state.plural}
          postObject={this.postObject}
          onPageChange={(e, { activePage }) =>
            dispatch(fetchCoverages({ page: activePage }))
          }
          additional={{
            clubs: clubs,
            groups: groups,
            categories: categories,
            carriers: carriers,
            brokers: brokers,
            orders: this.state.orders,
          }}
          filter={this.filterCoverages}
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
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  clubs: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  carriers: PropTypes.arrayOf(PropTypes.object).isRequired,
  brokers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { coverages, defaultActivePage, totalPages, status } = state.coverages;
  const { clubs } = state.clubs;
  const { groups } = state.groups;
  const { categories } = state.categories;
  const { carriers } = state.carriers;
  const { brokers } = state.brokers;
  return {
    coverages,
    clubs,
    groups,
    categories,
    carriers,
    brokers,
    defaultActivePage,
    totalPages,
    status,
  };
}

export default connect(mapStateToProps)(CoveragesContainer);
