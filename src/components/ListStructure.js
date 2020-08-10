import React from "react";
import PropTypes from "prop-types";
import PaginatedTable from "../components/PaginatedTable";
import NewObject from "../components/NewObject";
import { Card, Button } from "react-bootstrap";
import { capitalize, switchModal } from "../utils/Helpers";

export default class ListStructure extends React.Component {
  constructor() {
    super();
    this.switchModal = switchModal.bind(this);
  }

  state = {
    modal_new: false,
  };

  render() {
    const {
      formHelpers,
      form,
      name,
      plural,
      postObject,
      ...otherProps
    } = this.props;
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            All {capitalize(this.props.plural)}
          </Card.Title>
          <Card.Body>
            <PaginatedTable {...otherProps} />
          </Card.Body>
          <Card.Footer>
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_new")}
            >
              New {capitalize(this.props.name)}
            </Button>
          </Card.Footer>
        </Card>
        <NewObject
          show={this.state.modal_new}
          switchModal={() => this.switchModal("modal_new")}
          formHelpers={formHelpers}
          form={form}
          name={name}
          plural={plural}
          postObject={postObject}
        />
      </>
    );
  }
}

ListStructure.propTypes = {
  name: PropTypes.string.isRequired,
  postObject: PropTypes.func.isRequired,
};
