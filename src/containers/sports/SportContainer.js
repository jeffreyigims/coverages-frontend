import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import PropTypes from "prop-types";
import { fetchSport, updateSport, deleteSport } from "../../actions/Actions";

class SportContainer extends Component {
  state = {
    name: "sport",
    id: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.dispatch(fetchSport(this.state.id));
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/leagues/" + object.data.attributes.id}
                style={{ color: "black" }}
              >
                {object.data.attributes.name}
              </Button>
            </td>
            <td width="200" align="left">
              {object.data.attributes.level}
            </td>
          </tr>
        );
      });
    };

    return (
      <GeneralTable
        objects={object?.attributes.leagues}
        showObjects={showObjects}
        tableHeaders={["League", "Level"]}
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
            dispatch(updateSport({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            dispatch(deleteSport(id));
          }}
        />
      </>
    );
  }
}

SportContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { selected, status } = state.sports;
  const redirections = state.redirections;
  return { selected, status, redirections };
}

export default connect(mapStateToProps)(SportContainer);
