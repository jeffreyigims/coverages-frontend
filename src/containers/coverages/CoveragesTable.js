import React from "react";
import PropTypes from "prop-types";
import PaginatedTable from "../../components/PaginatedTable";
import AddObject from "../../components/AddObject";
import Filter from "./Filter";
import { Card, Button } from "react-bootstrap";
import { capitalize, switchModal } from "../../utils/Helpers";

export default class CoveragesTable extends React.Component {
  constructor() {
    super();
    this.switchModal = switchModal.bind(this);
  }

  state = {
    modal_new: false,
    modal_filter: false,
  };

  render() {
    const {
      name,
      plural,
      postObject,
      additional,
      filter,
      ...otherProps
    } = this.props;
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
            <Button
              className="btn btn-theme float-right"
              variant="primary"
              onClick={(slot) => this.switchModal("modal_filter")}
              style={{ marginRight: "10px" }}
            >
              Filter {capitalize(plural)}
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
        <Filter
          show={this.state.modal_filter}
          switchModal={() => this.switchModal("modal_filter")}
          name={name}
          plural={plural}
          filter={filter}
          additional={additional}
        />
      </>
    );
  }
}

CoveragesTable.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  plural: PropTypes.string.isRequired,
  postObject: PropTypes.func.isRequired,
  showObjects: PropTypes.func.isRequired,
  additonal: PropTypes.object,
};
