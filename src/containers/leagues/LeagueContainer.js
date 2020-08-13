import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import {
  fetchLeague,
  updateLeague,
  deleteLeague,
  fetchSports,
} from "../../actions/Actions";

class LeagueContainer extends Component {
  state = {
    name: "league",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchLeague(this.state.id));
    this.props.dispatch(fetchSports());
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/clubs/" + object.data.attributes.id}
                style={{ color: "black" }}
              >
                {object.data.attributes.name}
              </Button>
            </td>
            <td width="200" align="left">
              {object.data.attributes.abbreviation}
            </td>
            <td width="200" align="left">
              {object.data.attributes.club_groups_count}
            </td>
          </tr>
        );
      });
    };

    return (
      <GeneralTable
        objects={object?.attributes.clubs}
        showObjects={showObjects}
        tableHeaders={["Club", "Code", "Groups"]}
        status={this.props.status}
      />
    );
  };

  updateObject = (id, values) => {
    const new_object = {
      name: values.name,
      level: values.level,
      sport_id: this.props.sports[values.sport_index].attributes.id,
    };
    this.props.dispatch(updateLeague({ id: id, values: new_object }));
  };

  render() {
    const { dispatch, sports } = this.props;
    return (
      <>
        <DetailStructure
          {...this.props}
          name={this.state.name}
          showDetails={this.showDetails}
          updateObject={this.updateObject}
          deleteObject={(id) => {
            dispatch(deleteLeague(id));
          }}
          additional={{ sports: sports }}
        />
      </>
    );
  }
}

LeagueContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { selected, status } = state.leagues;
  const { sports } = state.sports;
  const redirections = state.redirections;
  return { selected, status, sports, redirections };
}

export default connect(mapStateToProps)(LeagueContainer);
