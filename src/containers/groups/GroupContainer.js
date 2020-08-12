import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import { fetchGroup, deleteGroup, updateGroup } from "../../actions/Actions";

class GroupContainer extends Component {
  state = {
    name: "group",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchGroup(this.state.id));
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/leagues/" + object.data.attributes.league.id}
                style={{ color: "black" }}
              >
                {object.data.attributes.league.name}
              </Button>
            </td>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/clubs/" + object.data.attributes.club.id}
                style={{ color: "black" }}
              >
                {object.data.attributes.club.name}
              </Button>{" "}
            </td>
            <td width="200" align="left">
              {object.data.attributes.club.abbreviation}
            </td>
          </tr>
        );
      });
    };

    return (
      <GeneralTable
        objects={object?.attributes.club_groups}
        showObjects={showObjects}
        tableHeaders={["League", "Name", "Code"]}
        status={this.props.status}
      />
    );
  };

  render() {
    const { dispatch } = this.props;
    return (
      <>
        <DetailStructure
          {...this.props}
          name={this.state.name}
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            dispatch(updateGroup({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            dispatch(deleteGroup(id));
          }}
        />
      </>
    );
  }
}

GroupContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { selected, status } = state.groups;
  const redirections = state.redirections;
  return { selected, status, redirections };
}

export default connect(mapStateToProps)(GroupContainer);
