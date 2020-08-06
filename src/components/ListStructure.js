import React from "react";
import PaginatedTable from "../components/PaginatedTable";
import NewObject from "../components/NewObject";
import { Card, Button } from "react-bootstrap";
import { capitalize } from "../utils/Helpers";
import "../App.css";

export default class ListStructure extends React.Component {
  state = {
    modal_new: false,
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
        <Card>
          <Card.Header></Card.Header>
          <Card.Title style={{ marginTop: "10px" }}>
            All {capitalize(this.props.plural)}
          </Card.Title>
          <Card.Body>
            <PaginatedTable
              objects={this.props.objects}
              showObjects={this.props.showObjects}
              tableHeaders={this.props.tableHeaders}
              status={this.props.status}
              onPageChange={this.props.onPageChange}
              defaultActivePage={this.props.defaultActivePage}
              totalPages={this.props.totalPages}
            />
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
          switchModal={this.switchModal}
          formHelpers={this.props.formHelpers}
          form={this.props.form}
          name={this.props.name}
          plural={this.props.plural}
          postObject={this.props.postObject}
        />
      </>
    );
  }
}

ListStructure.propTypes = {};
