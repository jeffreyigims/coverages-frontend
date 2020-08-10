import React from "react";
import PropTypes from "prop-types";
import { Modal, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { statusDisplay } from "../utils/Helpers";

class SearchResults extends React.Component {
  createLists = (results) => {
    const keys = Object.keys(results);
    return keys.map((key) => {
      return results[key].map((object, index) => (
        <tr key={key + index}>
          <td width="200" align="left">
            <Button variant="link" href={"/" + key} style={{ color: "black" }}>
              {key}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/" + key + "/" + object.id}
              style={{ color: "black" }}
            >
              {object.name || `${object.first_name} ${object.last_name}`}
            </Button>
          </td>
        </tr>
      ));
    });
  };

  render() {
    const { show, switchModal, results, hits, status } = this.props;
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
            hits === 0 ? (
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
                <tbody>{this.createLists(results)}</tbody>
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
  results: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { results, status, hits } = state.search;
  return { results, status, hits };
}

export default connect(mapStateToProps)(SearchResults);
