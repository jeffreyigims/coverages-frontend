import React, { Component } from "react";
import EditObject from "../../components/EditObject";
import AddObject from "../../components/AddObject";
import { Card, Button } from "react-bootstrap";
import { capitalize, canDelete, switchModal } from "../../utils/Helpers";
import { Redirect } from "react-router-dom";

export default class ClubDetails extends Component {
  constructor() {
    super();
    this.switchModal = switchModal.bind(this);
  }

  state = {
    modal_edit: false,
    modal_groups: false,
  };

  render() {
    const {
      selected,
      status,
      redirections,
      showDetails,
      deleteObject,
      name,
      leagues,
      groups,
    } = this.props;
    return (
      <>
        {redirections.redirect === true && <Redirect to={redirections.link} />}
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
              selected={this.props.selected}
              name={this.props.name}
              updateObject={this.props.updateObject}
              additional={{ leagues: leagues }}
            />
            <AddObject
              show={this.state.modal_groups}
              switchModal={() => this.switchModal("modal_groups")}
              selected={this.props.selected}
              name={"club_group"}
              postObject={this.props.postObject}
              additional={{ groups: groups }}
            />
          </>
        )}
      </>
    );
  }
}

ClubDetails.propTypes = {};
