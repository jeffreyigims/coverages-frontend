import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import { groups as formHelpers } from "../../utils/Schemas";
import { groupForm as form } from "../../utils/Forms";
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
        objects={object.attributes.club_groups}
        showObjects={showObjects}
        tableHeaders={["League", "Name", "Code"]}
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
          form={form}
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            this.props.dispatch(updateGroup({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteGroup(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

GroupContainer.propTypes = {
  selected: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.groups;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect };
}

export default connect(mapStateToProps)(GroupContainer);
