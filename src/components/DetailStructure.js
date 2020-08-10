import React, { Component } from "react";
import EditObject from "../components/EditObject";
import { Card, Button } from "react-bootstrap";
import { capitalize, canDelete, switchModal } from "../utils/Helpers";
import "../App.css";
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
      object,
      status,
      redirection,
      showDetails,
      deleteObject,
      updateObject,
      name,
    } = this.props;
    return (
      <>
        {redirection.redirect === true && <Redirect to={redirection.link} />}
        <Card>
          <Card.Header></Card.Header>
          {status === "succeeded" && (
            <Card.Title style={{ marginTop: "10px" }}>
              {capitalize(object.attributes.name)} Details
            </Card.Title>
          )}
          <Card.Body>{status === "succeeded" && showDetails(object)}</Card.Body>
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
                {canDelete(object) && (
                  <Button
                    className="btn btn-theme float-right"
                    variant="danger"
                    onClick={() => deleteObject(object.attributes.id)}
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
            formHelpers={this.props.formHelpers}
            form={this.props.form}
            object={object}
            name={name}
            updateObject={updateObject}
          />
        )}
      </>
    );
  }
}

DetailStructure.propTypes = {};
