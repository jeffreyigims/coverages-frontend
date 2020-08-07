import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { groups as formHelpers } from "../../utils/Schemas";
import { groupForm as form } from "../../utils/Forms";
import { fetchGroups, postGroup } from "../../actions/Actions";

class GroupsContainer extends Component {
  state = {
    tableHeaders: ["Name", "Associated Clubs"],
    name: "group",
    plural: "groups",
  };

  componentDidMount() {
    this.props.dispatch(fetchGroups());
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
            {object.attributes.club_groups.length}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <ListStructure
          objects={this.props.groups}
          status={this.props.status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          formHelpers={formHelpers}
          form={form}
          postObject={(values) => this.props.dispatch(postGroup(values))}
        />
      </>
    );
  }
}

GroupsContainer.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  const { groups, status, error } = state.groups;
  return { groups, status, error };
}

export default connect(mapStateToProps)(GroupsContainer);
