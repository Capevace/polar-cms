import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/posts';

import { Table, TableRow, TableLoading, TableCol } from '../../components/general/Table';
import { Row, Col } from '../../components/general/Grid';
import NavLink from '../../components/general/NavLink';
import PageTitle from '../../components/wrapper/PageTitle';
import PostSubNavBar from '../../components/posts/PostSubNavBar';
import PageLoader from '../../components/general/PageLoader';

class PostList extends React.Component {
  static propTypes = {
    posts: React.PropTypes.array,
    loading: React.PropTypes.bool,
    postType: React.PropTypes.object,
    params: React.PropTypes.shape({
      postType: React.PropTypes.string.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.setupComponent(this.props.params.postType);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.postType !== this.props.params.postType) {
      this.setupComponent(newProps.params.postType);
    }
  }

  setupComponent(postType) {
    this.props.fetchPostsIfNeeded(postType);
  }

  render() {
    return (
      <PageTitle title={this.props.postType.labels.plural}>
        <PageLoader loading={this.props.loading}>
          <PostSubNavBar postType={this.props.params.postType} active="list"/>
          <div className="container">
            <Row>
              <Col width='sm-12'>
                <Table headers={['Name', 'Action']}>
                  <TableLoading loading={this.props.loading} />

                  {this.props.posts && this.props.posts.map((post, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCol>
                          <NavLink path={`posts/${this.props.params.postType}/${post.slug}`}>
                            {post.title}
                          </NavLink>
                        </TableCol>

                        <TableCol>
                          <div className="btn-group btn-group-sm pull-xs-right" role="group" aria-label="Post Actions">
                            <NavLink
                              path={`posts/${this.props.params.postType}/${post.slug}`}
                              className="btn btn-secondary"
                            >
                              Edit
                            </NavLink>

                            <NavLink
                              path={`posts/${this.props.params.postType}/${post.slug}`}
                              className="btn btn-danger"
                            >
                              Delete
                            </NavLink>
                          </div>
                        </TableCol>
                      </TableRow>
                    );
                  })}
                </Table>
              </Col>
            </Row>
          </div>
        </PageLoader>
      </PageTitle>
    );
  }
}


const mapStateToProps = (state, props) => ({
  posts: state.posts.list[props.params.postType],
  loading: state.posts.loading > 0,
  postType: state.postTypes[props.params.postType]
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchPostsIfNeeded: (postType) => {
    dispatch(actions.fetchPostsIfNeeded(postType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
