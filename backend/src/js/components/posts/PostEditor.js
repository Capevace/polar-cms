import React from 'react';
import Binder from 'react-binding';

import { Row, Col } from '../general/Grid';

function slugify(text)
{
  if (!text) return '';

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}



class PostEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.post
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post !== this.state.post) {
      this.setState({
        post: newProps.post,
      });
    }
  }

  handleTitleChange(e) {
    this.setState({
      post: {
        ...this.state.post,
        title: e.target.value,
        slug: slugify(e.target.value),
      }
    });
  }

  handleContentChange(e) {
    this.setState({
      post: {
        ...this.state.post,
        slug: slugify(this.state.post.title),
        content: [e.target.value]
      }
    });
  }

  submitAction() {
    let post = this.state.post;
    post.slug = slugify(post.title);

    if (this.props.onSubmit) {
      this.props.onSubmit(post);
    }
  }

  render() {
    const postTypeName = this.props.postType.name;
    return (
      <div>
        {
          this.state.post &&
          <form onSubmit={(e) => {
            e.preventDefault();
            this.submitAction();
          }}>
            <Row>
              <Col width="sm-8">
                <div className="card">
                  <div className="card-block">
                    <div className="form-group">
                      <label htmlFor="title">{postTypeName} Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder={`Enter ${postTypeName} Title`}
                        value={this.state.post.title}
                        onChange={this.handleTitleChange.bind(this)}
                      />
                      <small id="titleHelp" className="form-text text-muted">The Title your {postTypeName} will named by.</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="content">{postTypeName} Content</label>
                      <textarea
                        className="form-control"
                        id="content"
                        rows="3"
                        aria-describedby="contentHelp"
                        placeholder="Enter your content"
                        value={this.state.post.content[0] ? this.state.post.content[0] : ''}
                        onChange={this.handleContentChange.bind(this)}></textarea>
                      <small id="contentHelp" className="form-text text-muted">The content of your {postTypeName}.</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tags">{postTypeName} Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="tags"
                        aria-describedby="tagsHelp"
                        placeholder={`Enter your tags`}
                      />
                      <small id="tagsHelp" className="form-text text-muted">
                        The tags your {postTypeName} will be tagged with. These are separated by commas.
                      </small>
                    </div>
                  </div>
                </div>
              </Col>

              <Col width="sm-4">
                <div className="card">
                  <div className="card-block">
                    <p className="card-text">Published:</p>
                    <button type="submit" className="btn btn-primary">
                      {
                        this.props.mode === 'create'
                          ? `Create new ${postTypeName}`
                          : `Save ${postTypeName}`
                      }
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        }
      </div>
    );
  }
}

export default PostEditor;

// {/* <form>
//   <div class="form-group">
//     <label for="exampleInputEmail1">Email address</label>
//     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
//     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
//   </div>
//   <div class="form-group">
//     <label for="exampleInputPassword1">Password</label>
//     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
//   </div>
//   <div class="form-group">
//     <label for="exampleSelect1">Example select</label>
//     <select class="form-control" id="exampleSelect1">
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//     </select>
//   </div>
//   <div class="form-group">
//     <label for="exampleSelect2">Example multiple select</label>
//     <select multiple class="form-control" id="exampleSelect2">
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//       <option>4</option>
//       <option>5</option>
//     </select>
//   </div>
//   <div class="form-group">
//     <label for="exampleTextarea">Example textarea</label>
//     <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
//   </div>
//   <div class="form-group">
//     <label for="exampleInputFile">File input</label>
//     <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
//     <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
//   </div>
//   <fieldset class="form-group">
//     <legend>Radio buttons</legend>
//     <div class="form-check">
//       <label class="form-check-label">
//         <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked>
//         Option one is this and that&mdash;be sure to include why it's great
//       </label>
//     </div>
//     <div class="form-check">
//     <label class="form-check-label">
//         <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
//         Option two can be something else and selecting it will deselect option one
//       </label>
//     </div>
//     <div class="form-check disabled">
//     <label class="form-check-label">
//         <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
//         Option three is disabled
//       </label>
//     </div>
//   </fieldset>
//   <div class="form-check">
//     <label class="form-check-label">
//       <input type="checkbox" class="form-check-input">
//       Check me out
//     </label>
//   </div>
//   <button type="submit" class="btn btn-primary">Submit</button>
// </form> */}
