import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import { leagues as formHelpers } from "../../utils/Schemas";
import { leagueForm as form } from "../../utils/Forms";
import {
  fetchLeague,
  updateLeague,
  deleteLeague,
  fetchSports,
} from "../../actions/Actions";

class LeagueContainer extends Component {
  state = {
    name: "league",
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch(fetchLeague(id));
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
        objects={object.attributes.clubs}
        showObjects={showObjects}
        tableHeaders={["Club", "Code", "Groups"]}
        status={this.props.status}
      />
    );
  };

  render() {
    return (
      <>
        <DetailStructure
          object={this.props.selected}
          status={this.props.status}
          name={this.state.name}
          formHelpers={formHelpers}
          form={(values, handleChange, setFieldValue, errors) =>
            form(values, handleChange, setFieldValue, errors, this.props.sports)
          }
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            this.props.dispatch(updateLeague({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteLeague(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

LeagueContainer.propTypes = {
  selected: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.leagues;
  const { sports } = state.sports;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect, sports };
}

export default connect(mapStateToProps)(LeagueContainer);
