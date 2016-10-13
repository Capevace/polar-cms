import React, { PropTypes } from 'react';
import { Row, Col } from '../../components/general/Grid';

function MediaListItem({ src, alt }) {
  return (
    <div className="img-rounded media-item">
      <img className="img-fluid media-thumbnail" src={src} alt={alt} />
      <div className="container media-edit-label">
        <Row>
          <Col width="xs-12">
            <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-primary">Edit</button>
              <button type="button" className="btn btn-danger">Delete</button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

MediaListItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default MediaListItem;
