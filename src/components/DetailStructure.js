import React, { Component } from "react";
import EditObject from "../components/EditObject";
import { Card, Button } from "react-bootstrap";
import { capitalize, canDelete, switchModal } from "../utils/Helpers";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export default class DetailStructure extends Component {
  constructor() {
    super();
    this.switchModal = switchModal.bind(this);
  }

  state = {
    modal_edit: false,
  };

  render() {
    const {
      selected,
      status,
      redirections,
      showDetails,
      deleteObject,
      updateObject,
      additional,
      name,
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
                {updateObject != null && (
                  <Button
                    className="btn btn-theme float-right"
                    variant="primary"
                    onClick={(slot) => this.switchModal("modal_edit")}
                  >
                    Edit {capitalize(name)}
                  </Button>
                )}
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
        {status === "succeeded" && updateObject != null && (
          <EditObject
            show={this.state.modal_edit}
            switchModal={() => this.switchModal("modal_edit")}
            selected={selected}
            name={name}
            updateObject={updateObject}
            additional={additional}
          />
        )}
      </>
    );
  }
}

DetailStructure.propTypes = {
  selected: PropTypes.object,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
  additonal: PropTypes.object,
  showDetails: PropTypes.func,
  deleteObject: PropTypes.func,
  updateObject: PropTypes.func,
  name: PropTypes.string,
};
