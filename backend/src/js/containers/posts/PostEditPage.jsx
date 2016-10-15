import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/postEditor';

import PageTitle from '../../components/wrapper/PageTitle';
import PageLoader from '../../components/general/PageLoader';

import PostEditor from '../../components/posts/PostEditor';
import PostSubNavBar from '../../components/posts/PostSubNavBar';

import ReactTransitionGroup from 'react-addons-css-transition-group';


class PostEditPage extends React.Component {
  componentDidMount() {
    this.setupEditor(this.props.mode, this.props.postType.slug, this.props.postId);
  }

  componentWillReceiveProps(newProps) {
    this.setupEditor(newProps.mode, newProps.postType.slug, newProps.postId);
  }

  setupEditor(mode, postTypeSlug, postId) {
    if (mode === 'create') {
      this.props.prepareCreateIfNeeded(postTypeSlug, mode);
    } else {
      this.props.prepareEditIfNeeded(postTypeSlug, postId, mode);
    }
  }

  handleSubmit(editedPost) {
    console.error(editedPost);

    if (this.props.mode === 'create') {
      this.props.createPost(this.props.postType.slug, editedPost);
    } else {
      this.props.savePost(this.props.postType.slug, editedPost);
    }
  }

  render() {
    return (
      <PageTitle
        title={
          this.props.mode === 'create'
            ? `Create new ${this.props.postType.name}`
            : `Edit ${this.props.postType.name}`
        }
      >
        <PageLoader loading={this.props.loading}>
          <PostSubNavBar postType={this.props.postType.slug} active={this.props.mode} />
          <div className="container">
            <PostEditor
              post={this.props.post}
              postType={this.props.postType}
              mode={this.props.mode}
              onSubmit={editedPost => this.handleSubmit(editedPost)}
              route={{ path: this.props.routing.locationBeforeTransitions.pathname }}
            />
          </div>
        </PageLoader>
      </PageTitle>
    );
  }
}

PostEditPage.propTypes = {
  postType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  post: PropTypes.object,
  postId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,

  savePost: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  prepareCreateIfNeeded: PropTypes.func.isRequired,
  prepareEditIfNeeded: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  postId: props.params.postId,
  postType: state.postTypes[props.params.postType],
  loading: state.postEditor.loading > 0,
  post: state.postEditor.post,
  routing: state.routing,
});

const mapDispatchToProps = dispatch => ({
  prepareCreateIfNeeded: (postType, mode) => {
    dispatch(
        actions.prepareCreateIfNeeded(postType, mode)
      );
  },
  prepareEditIfNeeded: (postType, postId, mode) => {
    dispatch(
        actions.prepareEditIfNeeded(postType, postId, mode)
      );
  },
  createPost: (postType, post) => {
    dispatch(
        actions.createPost(postType, post)
      );
  },
  savePost: (postType, post) => {
    dispatch(
        actions.savePost(postType, post)
      );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEditPage);
