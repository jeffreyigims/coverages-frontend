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
    return (
      <>
        {this.props.redirection.redirect === true && (
          <Redirect to={this.props.redirection.link} />
        )}
        <Card>
          <Card.Header></Card.Header>
          {this.props.status === "succeeded" && (
            <Card.Title style={{ marginTop: "10px" }}>
              {capitalize(this.props.object.attributes.name)} Details
            </Card.Title>
          )}
          <Card.Body>
            {this.props.status === "succeeded" &&
              this.props.showDetails(this.props.object)}
          </Card.Body>
          <Card.Footer>
            {this.props.status === "succeeded" && (
              <>
                <Button
                  className="btn btn-theme float-right"
                  variant="primary"
                  onClick={(slot) => this.switchModal("modal_edit")}
                >
                  Edit {capitalize(this.props.name)}
                </Button>
                <Button
                  className="btn btn-theme float-right"
                  variant="primary"
                  onClick={(slot) => this.switchModal("modal_groups")}
                  style={{ marginRight: "10px" }}
                >
                  Add Group
                </Button>
                {canDelete(this.props.object) && (
                  <Button
                    className="btn btn-theme float-right"
                    variant="danger"
                    onClick={() =>
                      this.props.deleteObject(this.props.object.attributes.id)
                    }
                    style={{ marginRight: "10px" }}
                  >
                    Delete {capitalize(this.props.name)}
                  </Button>
                )}
              </>
            )}
          </Card.Footer>
        </Card>
        {this.props.status === "succeeded" && (
          <>
            <EditObject
              show={this.state.modal_edit}
              switchModal={this.switchModal}
              formHelpers={this.props.formHelpers}
              form={this.props.form}
              object={this.props.object}
              name={this.props.name}
              updateObject={this.props.updateObject}
            />
            <AddGroup
              show={this.state.modal_groups}
              switchModal={this.switchModal}
              formHelpers={this.props.formHelpersGroups}
              form={this.props.formGroups}
              object={this.props.object}
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
