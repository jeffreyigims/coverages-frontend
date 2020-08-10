import React, { Component } from "react";
import EditObject from "../../components/EditObject";
import { Card, Button } from "react-bootstrap";
import { capitalize, canDelete } from "../../utils/Helpers";
import { Redirect } from "react-router-dom";
import AddGroup from "./AddGroup";

export default class ClubDetails extends Component {
  state = {
    modal_edit: false,
    modal_groups: false,
  };

  switchModal = (name) => {
    const modal = name;
    this.setState((prevState) => ({
      [modal]: !prevState[modal],
    }));
  };

  render() {
    const {
      selected,
      status,
      redirection,
      showDetails,
      deleteObject,
      name,
    } = this.props;
    return (
      <>
        {redirection.redirect === true && <Redirect to={redirection.link} />}
        <Card>
          <Card.Header></Card.Header>
          {status === "succeeded" && (
            <Card.Title style={{ marginTop: "10px" }}>
              {capitalize(selected.attributes.name)} Details
            </Card.Title>
          )}
          <Card.Body>
            {status === "succeeded" && showDetails(selected)}
          </Card.Body>
          <Card.Footer>
            {status === "succeeded" && (
              <>
                <Button
                  className="btn btn-theme float-right"
                  variant="primary"
                  onClick={(slot) => this.switchModal("modal_edit")}
                >
                  Edit {capitalize(name)}
                </Button>
                <Button
                  className="btn btn-theme float-right"
                  variant="primary"
                  onClick={(slot) => this.switchModal("modal_groups")}
                  style={{ marginRight: "10px" }}
                >
                  Add Group
                </Button>
                {canDelete(selected) && (
                  <Button
                    className="btn btn-theme float-right"
                    variant="danger"
                    onClick={() => deleteObject(selected.attributes.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Delete {capitalize(name)}
                  </Button>
                )}
              </>
            )}
          </Card.Footer>
        </Card>
        {status === "succeeded" && (
          <>
            <EditObject
              show={this.state.modal_edit}
              switchModal={() => this.switchModal("modal_edit")}
              formHelpers={this.props.formHelpers}
              form={this.props.form}
              object={this.props.selected}
              name={this.props.name}
              updateObject={this.props.updateObject}
            />
            <AddGroup
              show={this.state.modal_groups}
              switchModal={this.switchModal}
              formHelpers={this.props.formHelpersGroups}
              form={this.props.formGroups}
              object={this.props.selected}
              name={this.props.name}
              postObject={this.props.postObject}
            />
          </>
        )}
      </>
    );
  }
}

ClubDetails.propTypes = {};
