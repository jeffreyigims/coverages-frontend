import React from "react";
import { connect } from "react-redux";
import { Alert, Row } from "react-bootstrap";
import { dismissAlert } from "../actions/Actions";

class AlertsContainer extends React.Component {
  displayErrors = (errors) => {
    for (var key in errors) {
      return <Row>{"-" + errors[key]}</Row>;
    }
  };

  showAlerts = () => {
    return this.props.alerts.map((alert, index) => {
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
    return <>{this.showAlerts()}</>;
  }
}

AlertsContainer.propTypes = {};

function mapStateToProps(state) {
  const { alerts } = state.alerts;
  return { alerts };
}

export default connect(mapStateToProps)(AlertsContainer);
