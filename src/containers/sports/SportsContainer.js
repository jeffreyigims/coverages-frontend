import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListStructure from "../../components/ListStructure";
import { Button } from "react-bootstrap";
import { sports as formHelpers } from "../../utils/Schemas";
import { sportForm as form } from "../../utils/Forms";
import { fetchSports, postSport } from "../../actions/Actions";

class SportsContainer extends Component {
  state = {
    tableHeaders: ["Sport", "Leagues"],
    name: "sport",
    plural: "sports",
  };

  componentDidMount() {
    this.props.dispatch(fetchSports());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/sports/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.leagues.length}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <ListStructure
          objects={this.props.sports}
          status={this.props.status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          formHelpers={formHelpers}
          form={form}
          postObject={(values) => this.props.dispatch(postSport(values))}
        />
      </>
    );
  }
}

SportsContainer.propTypes = {
  sports: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { sports, status, error } = state.sports;
  return { sports, status, error };
}

export default connect(mapStateToProps)(SportsContainer);
