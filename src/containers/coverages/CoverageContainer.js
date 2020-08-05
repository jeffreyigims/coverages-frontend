import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { coverages as formHelpers } from "../../utils/Schemas";
import CoverageDetails from "./CoverageDetails";
import {
  fetchCoverage,
  updateCoverageAssociations,
  postCoverageBroker,
  deleteCoverageBroker,
  postCoverageCarrier,
  deleteCoverageCarrier,
  fetchCarriers,
  fetchBrokers,
} from "../../actions/Actions";

class CoverageContainer extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch(fetchCoverage(id));
    this.props.dispatch(fetchCarriers());
    this.props.dispatch(fetchBrokers());
  }

  includes = (arr, object, target) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].data.attributes[target] == object) {
        return true;
      }
    }
    return false;
  };

  handleBrokers = (objects) => {
    // Get array of current associated brokers
    let curr = this.props.selected.attributes.coverage_brokers;
    let needAdded = objects.filter(
      (object) => !this.includes(curr, object, "broker_id")
    );
    let needDestroyed = curr
      .filter((object) => !objects.includes(object.data.attributes.broker_id))
      .map((object) => object.data.attributes.id);
    return { needAdded: needAdded, needDestroyed: needDestroyed };
  };

  handleCarriers = (objects) => {
    // Get array of current associated carriers
    let curr = this.props.selected.attributes.coverage_carriers;
    let needAdded = objects.filter(
      (object) => !this.includes(curr, object, "carrier_id")
    );
    let needDestroyed = curr
      .filter((object) => !objects.includes(object.data.attributes.carrier_id))
      .map((object) => object.data.attributes.id);
    return { needAdded: needAdded, needDestroyed: needDestroyed };
  };

  updateCoverage = (values) => {
    const coverage = {
      notes: values.notes,
      start_date: values.satrt_date,
      end_date: values.end_date,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    let brokers = this.handleBrokers(values.brokers);
    let carriers = this.handleCarriers(values.carriers);
    this.props.dispatch(
      updateCoverageAssociations(
        {
          id: this.props.selected.attributes.id,
          values: coverage,
        },
        carriers,
        brokers
      )
    );
  };

  deleteCoverage = (values) => {
    console.log("Delete");
  };

  render() {
    return (
      <>
        <CoverageDetails
          object={this.props.selected}
          carriers={this.props.carriers}
          brokers={this.props.brokers}
          status={this.props.status}
          formHelpers={formHelpers}
          submit={(values) => this.updateCoverage(values)}
          deleteObject={(values) => this.deleteCoverage(values)}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

CoverageContainer.propTypes = {
  selected: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.coverages;
  const { carriers } = state.carriers;
  const { brokers } = state.brokers;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect, carriers, brokers };
}

export default connect(mapStateToProps)(CoverageContainer);
