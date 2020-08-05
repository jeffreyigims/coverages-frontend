import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryDetails from "./CategoryDetails";
import PropTypes from "prop-types";
import { categories as formHelpers } from "../../utils/Schemas";
import { categoryForm as form } from "../../utils/Forms";
import { sub_categories as formHelpersSub } from "../../utils/Schemas";
import { subCategoryForm as formSub } from "../../utils/Forms";
import {
  fetchCategory,
  updateCategory,
  deleteCategory,
  postSubCategory,
} from "../../actions/Actions";

class CategoryContainer extends Component {
  state = {
    name: "category",
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.dispatch(fetchCategory(id));
  }

  postSubCategory = (values) => {
    const new_object = {
      name: values.name,
      category_id: this.props.selected.attributes.id,
    };
    this.props.dispatch(postSubCategory(new_object));
  };

  render() {
    return (
      <>
        <CategoryDetails
          object={this.props.selected}
          secondary={this.props.secondary}
          status={this.props.status}
          name={this.state.name}
          formHelpers={formHelpers}
          form={form}
          formHelpersSub={formHelpersSub}
          formSub={(values, handleChange, setFieldValue, errors) =>
            formSub(
              values,
              handleChange,
              setFieldValue,
              errors,
              this.props.selected
            )
          }
          postSub={(values) => this.postSubCategory(values)}
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
  const { selected, status, error, secondary } = state.categories;
  const { link, redirect } = state.redirections;
  return { selected, status, error, link, redirect, secondary };
}

export default connect(mapStateToProps)(CategoryContainer);
