import React from "react";
import PropTypes from "prop-types";
import { Modal, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { statusDisplay } from "../utils/Helpers";

class SearchResults extends React.Component {
  createTable = (results) => {
    return results.map((result, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/" + result.type}
              style={{ color: "black" }}
            >
              {result.type}
            </Button>
          </td>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/" + result.type + "/" + result.id}
              style={{ color: "black" }}
            >
              {result.name || `${result.first_name} ${result.last_name}`}
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { show, switchModal, results, status } = this.props;
    return (
      <Modal show={show} onHide={switchModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Search Results for term: "{this.props.query}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusDisplay(
            status,
            results.length === 0 ? (
              "There are no results for the search term."
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {["Table", "Name"].map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{this.createTable(results)}</tbody>
              </Table>
            )
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

SearchResults.propTypes = {
  show: PropTypes.bool.isRequired,
  switchModal: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { results, status } = state.search;
  return { results, status };
}

export default connect(mapStateToProps)(SearchResults);
