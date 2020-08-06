import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { clubs as formHelpers } from "../../utils/Schemas";
import { clubForm as form } from "../../utils/Forms";
import { fetchClubs, postClub, fetchLeagues } from "../../actions/Actions";

class ClubsContainer extends Component {
  state = {
    tableHeaders: ["Name", "Code", "League", "Groups"],
    name: "club",
    plural: "clubs",
  };

  componentDidMount() {
    this.props.dispatch(fetchClubs());
    this.props.dispatch(fetchLeagues());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/clubs/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.attributes.abbreviation}
          </td>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/leagues/" + object.attributes.league.id}
              style={{ color: "black" }}
            >
              {object.attributes.league.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.club_groups_count}
          </td>
        </tr>
      );
    });
  };

  postObject = (values) => {
    const new_object = {
      name: values.name,
      abbreviation: values.level,
      league_id: this.props.leagues[values.league_index].attributes.id,
    };
    this.props.dispatch(postClub(new_object));
  };

  render() {
    return (
      <>
        <ListStructure
          objects={this.props.clubs}
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
              this.props.leagues
            )
          }
          postObject={this.postObject}
        />
      </>
    );
  }
}

ClubsContainer.propTypes = {
  clubs: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { clubs, status, error } = state.clubs;
  const { leagues } = state.leagues;
  return { clubs, leagues, status, error };
}

export default connect(mapStateToProps)(ClubsContainer);
