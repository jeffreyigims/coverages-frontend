import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
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
    const { carriers, status, dispatch } = this.props;
    return (
      <>
        <ListStructure
          objects={carriers}
          status={status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          postObject={(values) => dispatch(postCarrier(values))}
        />
      </>
    );
  }
}

CarriersContainer.propTypes = {
  carriers: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { carriers, status } = state.carriers;
  return { carriers, status };
}

export default connect(mapStateToProps)(CarriersContainer);
