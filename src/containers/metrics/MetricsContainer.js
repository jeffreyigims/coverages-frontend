import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchMetrics } from "../../actions/Actions";
import Metrics from "./Metrics";

class MetricsContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchMetrics());
  }

  render() {
    const { coverages, status } = this.props;
    return <Metrics objects={coverages} status={status} />;
  }
}

MetricsContainer.propTypes = {
  coverages: PropTypes.arrayOf(PropTypes.array).isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { coverages, status } = state.metrics;
  return { coverages, status };
}

export default connect(mapStateToProps)(MetricsContainer);
