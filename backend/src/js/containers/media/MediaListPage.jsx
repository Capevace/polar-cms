import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../../components/wrapper/PageTitle';
import PageLoader from '../../components/general/PageLoader';

import { Row, Col } from '../../components/general/Grid';

import MediaSubNavBar from '../../components/media/MediaSubNavBar';
import MediaListItem from '../../components/media/MediaListItem';

import * as actions from '../../actions/mediaList';


class MediaListPage extends React.Component {
  componentDidMount() {
    this.props.fetchMediaList();
  }

  render() {
    return (
      <PageTitle title="Media Manager">
        <PageLoader loading={this.props.mediaLoading}>

          <MediaSubNavBar active="list" />
          <div className="container">
            <Row>
              {
                this.props.mediaItems && this.props.mediaItems.map((mediaItem, index) =>
                  <Col
                    width="xs-6 col-sm-4 col-md-3 col-lg-2"
                    className="m-b-2"
                    key={index}
                  >
                    <MediaListItem
                      src={mediaItem.mediaData.src}
                      alt="..."
                    />
                  </Col>
                )
              }
            </Row>
          </div>

        </PageLoader>
      </PageTitle>
    );
  }
}

MediaListPage.propTypes = {
  mediaLoading: PropTypes.bool.isRequired,
  mediaItems: PropTypes.arrayOf(PropTypes.object),

  fetchMediaList: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  mediaItems: state.mediaList.items,
  mediaLoading: state.mediaList.loading > 0,
});

const mapDispatchToProps = dispatch => ({
  fetchMediaList: () => dispatch(actions.fetchMediaList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaListPage);
