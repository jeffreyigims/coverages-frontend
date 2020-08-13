import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CoverageDetails from "./CoverageDetails";
import {
  fetchCoverage,
  updateCoverageAssociations,
  fetchCarriers,
  fetchBrokers,
  deleteCoverage,
} from "../../actions/Actions";

class CoverageContainer extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch(fetchCoverage(id));
    this.props.dispatch(fetchCarriers());
    this.props.dispatch(fetchBrokers());
  }

  // Custom includes function to get correct attribute
  includes = (arr, object, target) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].attributes[target] === object) {
        return true;
      }
    }
    return false;
  };

  handleBrokers = (objects) => {
    // Get array of current associated brokers
    let curr = this.props.coverage_brokers;
    // Find brokers that need added or detroyed from list differences
    console.log(curr);
    console.log(objects);
    let needAdded = objects.filter(
      (object) => !this.includes(curr, object, "broker_id")
    );
    let needDestroyed = curr
      .filter((object) => !objects.includes(object.attributes.broker_id))
      .map((object) => object.attributes.id);
    return { needAdded: needAdded, needDestroyed: needDestroyed };
  };

  handleCarriers = (objects) => {
    // Get array of current associated carriers
    let curr = this.props.coverage_carriers;
    // Find carriers that need added or detroyed from list differences
    let needAdded = objects.filter(
      (object) => !this.includes(curr, object, "carrier_id")
    );
    let needDestroyed = curr
      .filter((object) => !objects.includes(object.attributes.carrier_id))
      .map((object) => object.attributes.id);
    return { needAdded: needAdded, needDestroyed: needDestroyed };
  };

  updateCoverage = (values) => {
    const coverage = {
      notes: values.notes,
      start_date: values.start_date,
      end_date: values.end_date,
      has_coverage_line: values.has_coverage_line,
      verified: values.verified,
    };
    let brokers = this.handleBrokers(values.brokers);
    let carriers = this.handleCarriers(values.carriers);
    this.props.dispatch(
      updateCoverageAssociations(
        {
          id: this.props.match.params.id,
          values: coverage,
        },
        carriers,
        brokers
      )
    );
  };

  render() {
    const { dispatch, ...otherProps } = this.props;
    return (
      <>
        <CoverageDetails
          {...otherProps}
          submit={this.updateCoverage}
          deleteObject={(values) => dispatch(deleteCoverage(values))}
        />
      </>
    );
  }
}

CoverageContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  carriers: PropTypes.arrayOf(PropTypes.object).isRequired,
  brokers: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirections: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { selected, status } = state.coverages;
  const coverage_carriers = state.coverages.carriers;
  const coverage_brokers = state.coverages.brokers;
  const { carriers } = state.carriers;
  const { brokers } = state.brokers;
  const redirections = state.redirections;
  return {
    selected,
    status,
    coverage_carriers,
    coverage_brokers,
    carriers,
    brokers,
    redirections,
  };
}

export default connect(mapStateToProps)(CoverageContainer);
