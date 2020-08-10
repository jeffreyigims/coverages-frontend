import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListStructure from "../../components/ListStructure";
import { Button } from "react-bootstrap";
import { fetchSports, postSport } from "../../actions/Actions";

class SportsContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSports());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/sports/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.leagues.length}
          </td>
        </tr>
      );
    });
  };

  render() {
    const { sports, status, dispatch } = this.props;
    return (
      <>
        <ListStructure
          objects={sports}
          status={status}
          showObjects={this.showObjects}
          tableHeaders={["Sport", "Leagues"]}
          name={"sport"}
          plural={"sports"}
          postObject={(values) => dispatch(postSport(values))}
        />
      </>
    );
  }
}

SportsContainer.propTypes = {
  sports: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { sports, status } = state.sports;
  return { sports, status };
}

export default connect(mapStateToProps)(SportsContainer);
