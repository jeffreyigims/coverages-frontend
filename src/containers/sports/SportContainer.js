import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import PropTypes from "prop-types";
import { fetchSport, updateSport, deleteSport } from "../../actions/Actions";
import { sports as formHelpers } from "../../utils/Schemas";
import { sportForm as form } from "../../utils/Forms";

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
        objects={object.attributes.leagues}
        showObjects={showObjects}
        tableHeaders={["League", "Level"]}
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
            this.props.dispatch(updateSport({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteSport(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

SportContainer.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.sports;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect };
}

export default connect(mapStateToProps)(SportContainer);
