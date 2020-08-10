import React from "react";
import { connect } from "react-redux";
import { Alert, Row } from "react-bootstrap";
import { dismissAlert } from "../actions/Actions";
import PropTypes from "prop-types";

class AlertsContainer extends React.Component {
  displayErrors = (errors) => {
    for (var key in errors) {
      return <Row>{"-" + errors[key]}</Row>;
    }
  };

  showAlerts = (alerts) => {
    return alerts.map((alert, index) => {
      return (
        <Alert
          key={index}
          variant={alert.variant}
          onClose={() => this.props.dispatch(dismissAlert(index))}
          dismissible
          style={{ margin: "20px" }}
        >
          <Row>{alert.message}</Row>
          {this.displayErrors(alert.errors)}
        </Alert>
      );
    });
  };

  render() {
    const { alerts } = this.props;
    return <>{this.showAlerts(alerts)}</>;
  }
}

AlertsContainer.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { alerts } = state.alerts;
  return { alerts };
}

export default connect(mapStateToProps)(AlertsContainer);
