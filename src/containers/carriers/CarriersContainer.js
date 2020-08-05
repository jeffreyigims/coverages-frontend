import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { carriers as formHelpers } from "../../utils/Schemas";
import { carrierForm as form } from "../../utils/Forms";
import { fetchCarriers, postCarrier } from "../../actions/Actions";

class CarriersContainer extends Component {
  state = {
    tableHeaders: ["Name", "Coverages"],
    name: "carrier",
    plural: "carriers",
  };

  componentDidMount() {
    this.props.dispatch(fetchCarriers());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/" + this.state.plural + "/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.associated_coverages}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <ListStructure
          objects={this.props.carriers}
          status={this.props.status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          formHelpers={formHelpers}
          form={form}
          postObject={(values) => this.props.dispatch(postCarrier(values))}
        />
      </>
    );
  }
}

CarriersContainer.propTypes = {
  carriers: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.object,
};

function mapStateToProps(state) {
  const { carriers, status, errors } = state.carriers;
  return { carriers, status, errors };
}

export default connect(mapStateToProps)(CarriersContainer);
