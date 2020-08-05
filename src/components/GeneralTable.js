import React from "react";
import PropTypes from "prop-types";
import { Table, Spinner, Row } from "react-bootstrap";

export default class GeneralTable extends React.Component {
  render() {
    const { objects, showObjects, tableHeaders, status } = this.props;
    return (
      <>
        <Row className="row justify-content-center">
          {status === "loading" && (
            <Spinner animation="border" variant="primary" />
          )}
        </Row>
        {status === "succeeded" &&
          (objects.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{showObjects(objects)}</tbody>
            </Table>
          ) : (
            "There is no data to display at this time."
          ))}
      </>
    );
  }
}

GeneralTable.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  showObjects: PropTypes.func.isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string,
};
