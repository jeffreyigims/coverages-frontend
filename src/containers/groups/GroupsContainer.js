import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
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
    const { groups, status, dispatch } = this.props;
    return (
      <>
        <ListStructure
          objects={groups}
          status={status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          postObject={(values) => dispatch(postGroup(values))}
        />
      </>
    );
  }
}

GroupsContainer.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { groups, status } = state.groups;
  return { groups, status };
}

export default connect(mapStateToProps)(GroupsContainer);
