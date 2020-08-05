import React, { Component } from "react";
import { connect } from "react-redux";
import ListStructure from "../../components/ListStructure";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { categories as formHelpers } from "../../utils/Schemas";
import { categoryForm as form } from "../../utils/Forms";
import { fetchCategories, postCategory } from "../../actions/Actions";

class CategoriesContainer extends Component {
  state = {
    tableHeaders: ["Name", "Associated Subs"],
    name: "category",
    plural: "categories",
  };

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  showObjects = (objects) => {
    return objects.map((object, index) => {
      return (
        <tr key={index}>
          <td width="200" align="left">
            <Button
              variant="link"
              href={"/categories/" + object.attributes.id}
              style={{ color: "black" }}
            >
              {object.attributes.name}
            </Button>{" "}
          </td>
          <td width="200" align="left">
            {object.attributes.associated_sub_categories}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <ListStructure
          objects={this.props.categories}
          status={this.props.status}
          showObjects={this.showObjects}
          tableHeaders={this.state.tableHeaders}
          name={this.state.name}
          plural={this.state.plural}
          formHelpers={formHelpers}
          form={form}
          postObject={(values) => this.props.dispatch(postCategory(values))}
        />
      </>
    );
  }
}

CategoriesContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  errors: PropTypes.string,
};

function mapStateToProps(state) {
  const { categories, status, errors } = state.categories;
  return { categories, status, errors };
}

export default connect(mapStateToProps)(CategoriesContainer);
