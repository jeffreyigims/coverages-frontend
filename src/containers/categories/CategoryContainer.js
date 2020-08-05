import React, { Component } from "react";
import { connect } from "react-redux";
import DetailStructure from "../../components/DetailStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import GeneralTable from "../../components/GeneralTable";
import { categories as formHelpers } from "../../utils/Schemas";
import { categoryForm as form } from "../../utils/Forms";
import {
  fetchCategory,
  updateCategory,
  deleteCategory,
} from "../../actions/Actions";

class CategoryContainer extends Component {
  state = {
    name: "category",
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch(fetchCategory(id));
  }

  showDetails = (object) => {
    let showObjects = (objects) => {
      return objects.map((object, index) => {
        return (
          <tr key={index}>
            <td width="200" align="left">
              <Button
                variant="link"
                href={"/sub_categories/" + object.data.attributes.id}
                style={{ color: "black" }}
              >
                {object.data.attributes.name}
              </Button>
            </td>
            <td width="200" align="left">
              {object.data.attributes.associated_coverages}
            </td>
          </tr>
        );
      });
    };

    return (
      <GeneralTable
        objects={object.attributes.sub_categories}
        showObjects={showObjects}
        tableHeaders={["Name", "Coverages"]}
      />
    );
  };

  render() {
    return (
      <>
        <DetailStructure
          object={this.props.selected}
          status={this.props.status}
          name={this.state.name}
          formHelpers={formHelpers}
          form={form}
          showDetails={this.showDetails}
          updateObject={(id, values) => {
            this.props.dispatch(updateCategory({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            this.props.dispatch(deleteCategory(id));
          }}
          redirection={{ link: this.props.link, redirect: this.props.redirect }}
        />
      </>
    );
  }
}

CategoryContainer.propTypes = {
  selected: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  link: PropTypes.string,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  const { selected, status, error } = state.categories;
  const { sports } = state.sports;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect };
}

export default connect(mapStateToProps)(CategoryContainer);
