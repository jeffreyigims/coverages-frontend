import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { fetchClubs, postClub, fetchLeagues } from "../../actions/Actions";

class ClubsContainer extends Component {
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
            </Button>
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
      abbreviation: values.abbreviation,
      league_id: this.props.leagues[values.league_index].attributes.id,
    };
    this.props.dispatch(postClub(new_object));
  };

  render() {
    const { clubs, status, leagues } = this.props;
    return (
      <>
        <ListStructure
          objects={clubs}
          status={status}
          showObjects={this.showObjects}
          tableHeaders={["Name", "Code", "League", "Groups"]}
          name={"club"}
          plural={"clubs"}
          postObject={this.postObject}
          additional={{ leagues: leagues }}
        />
      </>
    );
  }
}

ClubsContainer.propTypes = {
  clubs: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  leagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  const { clubs, status, error } = state.clubs;
  const { leagues } = state.leagues;
  return { clubs, leagues, status, error };
}

export default connect(mapStateToProps)(ClubsContainer);
