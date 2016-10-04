import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/posts';

import PostEditor from '../../components/posts/PostEditor';
import PostSubNavBar from '../../components/posts/PostSubNavBar';
import PageTitle from '../../components/wrapper/PageTitle';
import PageLoader from '../../components/general/PageLoader';

class PostCreator extends React.Component {
  render() {
    return (
      <PageTitle title={`New ${this.props.postType.name}`}>
        <PageLoader loading={this.props.loading}>
          <PostSubNavBar postType={this.props.params.postType} active="create" />
          <div className="container">
            <PostEditor postType={this.props.postType} onSubmit={(post) => {
              this.props.createNewPost(post, this.props.postType.slug);
            }}/>
          </div>
        </PageLoader>
      </PageTitle>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    postType: state.postTypes[props.params.postType],
    loading: state.posts.loading > 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPost: (post, propType) => {
      dispatch(actions.createNewPost(post, propType));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
