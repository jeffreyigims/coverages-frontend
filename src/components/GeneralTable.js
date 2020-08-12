import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { statusDisplay } from "../utils/Helpers";

export default class GeneralTable extends React.Component {
  render() {
    const { objects, showObjects, tableHeaders, status } = this.props;
    return (
      <>
        {statusDisplay(
          status,
          objects != null && objects.length > 0 ? (
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
          )
        )}
      </>
    );
  }
}

GeneralTable.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object),
  showObjects: PropTypes.func.isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
};
