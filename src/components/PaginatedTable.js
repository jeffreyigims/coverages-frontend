import React, { Component } from "react";
import PropTypes from "prop-types";
import GeneralTable from "./GeneralTable";
import { Pagination } from "semantic-ui-react";
import { Row } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";

export default class PaginatedTable extends React.Component {
  render() {
    return (
      <>
        <GeneralTable
          tableHeaders={this.props.tableHeaders}
          showObjects={this.props.showObjects}
          objects={this.props.objects}
          status={this.props.status}
        />
        {this.props.objects.length > 0 &&
          this.props.onPageChange != null &&
          this.props.status === "succeeded" && (
            <Row className="row justify-content-center">
              <Pagination
                onPageChange={this.props.onPageChange}
                defaultActivePage={this.props.defaultActivePage}
                totalPages={this.props.totalPages}
              />
            </Row>
          )}
      </>
    );
  }
}

PaginatedTable.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  showObjects: PropTypes.func.isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  message: PropTypes.string,
  showObjects: PropTypes.func.isRequired,
  defaultActivePage: PropTypes.number,
  totalPages: PropTypes.number,
};
