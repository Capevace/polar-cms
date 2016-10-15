import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import flatMap from 'flatmap';
import history from '../../history';

import { Row, Col } from '../general/Grid';
import Card from '../general/Card';
import Button from '../general/Button';
import FormField from '../general/FormField';


function simpleSlugify(text) {
  if (!text) return '';

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '');             // Trim - from start of text
}

const pathToObject = (input, path, value) => {
  const instance = { ...input };
  let schema = instance;
  const pathList = flatMap(path.split('.'), (p) => {
    if (p.indexOf('[') !== -1 && p.endsWith(']')) { // If array is specified (e.g. myArray[509])
      const arrayName = p.slice(0, p.indexOf('['));
      // const arrayIndex = p.slice()
      const index = parseInt(p.replace(/\w+\[|\]/g, ''), 10);

      return [
        {
          path: arrayName,
          type: 'array',
        },
        {
          path: index,
          type: 'object',
        },
      ];
    }

    return {
      path: p,
      type: 'object',
    };
  });

  for (let i = 0; i < pathList.length - 1; i += 1) {
    const elem = pathList[i];
    if (!schema[elem.path]) {
      schema[elem.path] = elem.type === 'array' ? [] : {};
    }

    schema = schema[elem.path];
  }

  const lastElement = pathList[pathList.length - 1];

  schema[lastElement.path] = value;

  return instance;
};


class PostEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.post,
      unsaved: false,
    };

    this.submitAction = this.submitAction.bind(this);
  }

  componentWillMount() {
    // Listen to location changes, so we can confirm navigation when changes have been made
    if (!this.confirmChangeListener) {
      this.confirmChangeListener = history.listenBefore(() => {
        if (this.state.unsaved) {
          return 'Are you sure you want to leave this page?';
        }

        return null;
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post !== this.state.post) {
      this.setState({
        post: newProps.post,
        unsaved: false,
      });
    }
  }

  componentWillUnmount() {
    if (this.confirmChangeListener) {
      this.confirmChangeListener();
    }
  }

  submitAction(e) {
    e.preventDefault();

    const post = this.state.post;

    if (!post.title) {
      alert('Every post needs a title!'); // eslint-disable-line
      return;
    }

    if (!post.slug) {
      post.slug = simpleSlugify(post.title);
    }

    if (!post.postType) {
      post.postType = this.props.postType.slug;
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(post);
    }
  }

  mapChange(path) {
    return (val) => {
      this.setState({
        post: pathToObject(this.state.post, path, val),
        unsaved: true,
      });
    };
  }

  sanitizeChange(path, validator) {
    return (val) => {
      const validatedValue = validator(val);
      this.mapChange(path)(validatedValue);
    };
  }

  render() {
    const postTypeName = this.props.postType.name;
    return (
      <div>
        {
          this.state.post &&
            <form onSubmit={this.submitAction}>
              <Helmet title={`Editing${this.state.unsaved ? '*' : ''}`} />
              <Row>
                <Col width="sm-8">
                  <Card>
                    <FormField
                      title="Title"
                      placeholder={`Enter the ${postTypeName} title.`}
                      type="text"
                      help={`The name of this ${postTypeName}.`}
                      value={this.state.post.title}
                      onChange={this.mapChange('title')}
                      required
                    />

                    <FormField
                      title="Content"
                      placeholder={`Enter the ${postTypeName} content.`}
                      type="textarea"
                      help={`The name of this ${postTypeName}.`}
                      value={this.state.post.content[2]}
                      onChange={this.mapChange('content[0]')}
                    />
                  </Card>
                </Col>

                <Col width="sm-4">
                  <Card>
                    <Button
                      title={
                        this.props.mode === 'create'
                          ? `Create new ${postTypeName}`
                          : `Save ${postTypeName}`
                      }
                      type="submit"
                      className="btn-primary"
                    />

                    <hr />

                    <FormField
                      title="Slug"
                      placeholder={simpleSlugify(this.state.post.title)}
                      prefix={`${this.props.postType.slug} /`}
                      type="text"
                      help={`The URL your ${postTypeName} will be accessed by.`}
                      value={this.state.post.slug}
                      onChange={this.sanitizeChange('slug', simpleSlugify)}
                    />

                    <FormField
                      title="Tags"
                      placeholder={this.state.post.title}
                      type="text"
                      help={`The tags your ${postTypeName} will be tagged by. (Seperated by comma)`}
                      value={this.state.post.meta.tags ? this.state.post.meta.tags.join(', ') : ''}
                      onChange={this.sanitizeChange('meta.tags', val => val.split(', '))}
                    />
                  </Card>
                </Col>
              </Row>
            </form>
        }
      </div>
    );
  }
}

PostEditor.propTypes = {
  mode: PropTypes.string.isRequired,
  post: PropTypes.object,
  postType: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
  }),

  onSubmit: PropTypes.func,
  preventChanges: PropTypes.func,
  unpreventChanges: PropTypes.func,
};

export default PostEditor;
