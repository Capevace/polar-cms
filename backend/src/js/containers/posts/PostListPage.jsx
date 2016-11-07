import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/postList';

import { Table, TableRow, TableCol } from '../../components/general/Table';
import { Row, Col } from '../../components/general/Grid';
import NavLink from '../../components/general/NavLink';
import PageTitle from '../../components/wrapper/PageTitle';
import PostSubNavBar from '../../components/posts/PostSubNavBar';
import PageLoader from '../../components/general/PageLoader';

class PostListPage extends React.Component {
  componentDidMount() {
    this.props.fetchPostsIfNeeded(this.props.postType.slug);
  }

  componentWillReceiveProps(newProps) {
    this.props.fetchPostsIfNeeded(newProps.postType.slug);
  }

  render() {
    return (
      <PageTitle title={this.props.postType.labels.plural || `${this.props.postType.name}s`}>
        <PageLoader loading={this.props.loading}>

          <PostSubNavBar postType={this.props.postType.slug} active="list" />
          <div className="container">
            <Row>
              <Col width="sm-12">
                <Table headers={['Name', 'Action']}>
                  {
                    this.props.posts && this.props.posts.map((post, index) =>
                      <TableRow key={index}>
                        <TableCol>
                          <NavLink path={`posts/${this.props.postType.slug}/edit/${post._id}`}>
                            {post.title}
                          </NavLink>
                        </TableCol>

                        <TableCol>
                          <div
                            className="btn-group btn-group-sm pull-xs-right"
                            role="group"
                            aria-label="Post Actions"
                          >
                            <NavLink
                              path={`posts/${this.props.postType.slug}/edit/${post._id}`}
                              className="btn btn-secondary"
                            >
                              Edit
                            </NavLink>

                            <NavLink
                              path={`posts/${this.props.postType.slug}/${post._id}`}
                              className="btn btn-outline-danger"
                            >
                              Deletes
                            </NavLink>
                          </div>
                        </TableCol>
                      </TableRow>
                    )
                  }
                </Table>
              </Col>
            </Row>
          </div>

        </PageLoader>
      </PageTitle>
    );
  }
}

PostListPage.propTypes = {
  postType: PropTypes.shape({
    labels: PropTypes.shape({
      plural: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),

  fetchPostsIfNeeded: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  posts: state.postList.posts,
  page: state.postList.page,
  loading: state.postList.loading,
  postType: state.postTypes[props.params.postType],
});

const mapDispatchToProps = dispatch => ({
  fetchPostsIfNeeded: (postType) => {
    dispatch(actions.fetchPostsIfNeeded(postType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
