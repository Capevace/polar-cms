import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/postEditor';

import PostEditor from '../../components/posts/PostEditor';
import PostSubNavBar from '../../components/posts/PostSubNavBar';
import PageTitle from '../../components/wrapper/PageTitle';
import PageLoader from '../../components/general/PageLoader';

class PostEditPage extends React.Component {

  componentDidMount() {
    this.setupEditor(this.props.mode, this.props.postType.slug, this.props.postSlug);
  }

  componentWillReceiveProps(newProps) {
    this.setupEditor(newProps.mode, newProps.postType.slug, newProps.postSlug);
  }

  setupEditor(mode, postTypeSlug, postSlug) {
    if (mode === 'create') {
      this.props.prepareCreateIfNeeded(postTypeSlug, mode);
    } else {
      this.props.prepareEditIfNeeded(postTypeSlug, postSlug, mode);
    }
  }

  handleSubmit(editedPost) {
    if (this.props.mode === 'create') {
      this.props.createPost(this.props.postType.slug, editedPost);
    } else {

    }
  }

  render() {
    return (
      <PageTitle title={this.props.mode === 'create' ? `Create` : `Edit`}>
        <PageLoader loading={this.props.loading}>
          <PostSubNavBar postType={this.props.postType.slug} active={this.props.mode} />
          <div className="container">
            {JSON.stringify(this.props.post)}
            <PostEditor
              post={this.props.post}
              postType={this.props.postType}
              mode={this.props.mode}
              onSubmit={this.handleSubmit.bind(this)}
            />
          </div>
        </PageLoader>
      </PageTitle>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    postSlug: props.params.postSlug,
    postType: state.postTypes[props.params.postType],
    loading: state.postEditor.loading > 0,
    post: state.postEditor.post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    prepareCreateIfNeeded: (postType, mode) => {
      dispatch(
        actions.prepareCreateIfNeeded(postType, mode)
      );
    },
    prepareEditIfNeeded: (postType, postSlug, mode) => {
      dispatch(
        actions.prepareEditIfNeeded(postType, postSlug, mode)
      );
    },
    createPost: (postType, post) => {
      dispatch(
        actions.createPost(postType, post)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditPage);
