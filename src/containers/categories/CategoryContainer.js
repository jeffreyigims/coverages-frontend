import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryDetails from "./CategoryDetails";
import PropTypes from "prop-types";
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
    const { dispatch } = this.props;
    return (
      <>
        <CategoryDetails
          {...this.props}
          name={this.state.name}
          postSub={(values) => this.postSubCategory(values)}
          updateObject={(id, values) => {
            dispatch(updateCategory({ id: id, values: values }));
          }}
          deleteObject={(id) => {
            dispatch(deleteCategory(id));
          }}
        />
      </>
    );
  }
}

CategoryContainer.propTypes = {
  selected: PropTypes.object,
  secondary: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  redirections: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { selected, status, secondary } = state.categories;
  const redirections = state.redirections;
  return { selected, secondary, status, redirections };
}

export default connect(mapStateToProps)(CategoryContainer);
