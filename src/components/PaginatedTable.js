import React from "react";
import PropTypes from "prop-types";
import GeneralTable from "./GeneralTable";
import { Pagination } from "semantic-ui-react";
import { Row } from "react-bootstrap";
import "semantic-ui-css/semantic.min.css";

export default class PaginatedTable extends React.Component {
  render() {
    const {
      onPageChange,
      defaultActivePage,
      totalPages,
      ...otherProps
    } = this.props;
    return (
      <>
        <GeneralTable {...otherProps} />
        {this.props.objects.length > 0 &&
          this.props.onPageChange != null &&
          this.props.status === "succeeded" && (
            <Row className="row justify-content-center">
              <Pagination
                onPageChange={onPageChange}
                defaultActivePage={defaultActivePage}
                totalPages={totalPages}
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
  defaultActivePage: PropTypes.number,
  totalPages: PropTypes.number,
};
