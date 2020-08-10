import React from "react";
import PropTypes from "prop-types";
import PaginatedTable from "../components/PaginatedTable";
import AddObject from "./AddObject";
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
    const { name, plural, postObject, additional, ...otherProps } = this.props;
    return (
      <>
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            All {capitalize(plural)}
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
              New {capitalize(name)}
            </Button>
          </Card.Footer>
        </Card>
        <AddObject
          show={this.state.modal_new}
          switchModal={() => this.switchModal("modal_new")}
          name={name}
          plural={plural}
          postObject={postObject}
          additional={additional}
        />
      </>
    );
  }
}

ListStructure.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  plural: PropTypes.string.isRequired,
  postObject: PropTypes.func.isRequired,
  showObjects: PropTypes.func.isRequired,
  additonal: PropTypes.object,
};
