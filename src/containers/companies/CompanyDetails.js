import React from "react";
import EditObject from "../../components/EditObject";
import AddObject from "../../components/AddObject";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { capitalize, canDelete, switchModal } from "../../utils/Helpers";
import { Redirect } from "react-router-dom";
import GeneralTable from "../../components/GeneralTable";

export default class CompanyDetails extends React.Component {
  constructor() {
    super();
    this.switchModal = switchModal.bind(this);
  }
  state = {
    modal_edit: false,
    modal_broker: false,
  };

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/brokers/" + object.data.attributes.id}
                style={{ color: "black" }}
              >
                {object.data.attributes.name}
              </Button>
            </td>
            <td width="200" align="left">
              {object.data.attributes.associated_coverages}
            </td>
          </tr>
        );
      });
    };

    return (
      <GeneralTable
        objects={this.props.secondary}
        showObjects={showObjects}
        tableHeaders={["Name", "Associated"]}
        status={this.props.status}
      />
    );
  };

  render() {
    const {
      selected,
      status,
      redirections,
      updateObject,
      deleteObject,
      name,
      postBroker,
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
            {status === "succeeded" && this.showDetails(selected)}
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
                  onClick={(slot) => this.switchModal("modal_broker")}
                  style={{ marginRight: "10px" }}
                >
                  Add Broker
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
              selected={selected}
              name={name}
              updateObject={updateObject}
            />
            <AddObject
              show={this.state.modal_broker}
              switchModal={() => this.switchModal("modal_broker")}
              selected={selected}
              name={"broker"}
              postObject={postBroker}
              additional={{ company: selected.attributes }}
            />
          </>
        )}
      </>
    );
  }
}

CompanyDetails.propTypes = {
  selected: PropTypes.object,
  redirections: PropTypes.object,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateObject: PropTypes.func.isRequired,
  deleteObject: PropTypes.func.isRequired,
  postBroker: PropTypes.func.isRequired,
};
