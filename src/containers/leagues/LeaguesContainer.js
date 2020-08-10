import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { fetchLeagues, postLeague, fetchSports } from "../../actions/Actions";

class LeaguesContainer extends Component {
  state = {
    tableHeaders: ["Name", "Level"],
    name: "league",
    plural: "leagues",
  };

  componentDidMount() {
    this.props.dispatch(fetchLeagues());
    this.props.dispatch(fetchSports());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/leagues/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>
          </td>
          <td width="200" align="left">
            {object.attributes.level}
          </td>
        </tr>
      );
    });
  };

  postObject = (values) => {
    const new_object = {
      name: values.name,
      level: values.level,
      sport_id: this.props.sports[values.sport_index].attributes.id,
    };
    this.props.dispatch(postLeague(new_object));
  };

  render() {
    const { leagues, status, sports } = this.props;
    return (
      <>
        <ListStructure
          objects={leagues}
          status={status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          additional={{ sports: sports }}
          postObject={this.postObject}
        />
      </>
    );
  }
}

LeaguesContainer.propTypes = {
  leagues: PropTypes.arrayOf(PropTypes.object).isRequired,
  sports: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { leagues, status } = state.leagues;
  const { sports } = state.sports;
  return { sports, leagues, status };
}

export default connect(mapStateToProps)(LeaguesContainer);
