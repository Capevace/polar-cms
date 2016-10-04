import url from 'url';
import axios from 'axios';

export const apiUrl = 'http://localhost:8080/api/';

function fetchHasThrown() {

}

export function fetchPostTypes() {
  const requestUrl = url.resolve(apiUrl, 'posts/post-types');

  return new Promise((resolve, reject) => {
    fetch(requestUrl)
      .then(response => response.json(), reject)
      .then(resolve)
      .catch(fetchHasThrown);
  });
}

export function fetchPosts(postType) {
  const requestUrl = url.resolve(apiUrl, `posts/${postType}`);

  return new Promise((resolve, reject) => {
    fetch(requestUrl)
      .then(response => response.json(), reject)
      .then(resolve)
      .catch(fetchHasThrown);
  });
}

export function createNewPost(post, postType) {
  const requestUrl = url.resolve(apiUrl, `posts/${postType}`);
  console.info('POST:', post);
  return new Promise((resolve, reject) => {
    axios.post(requestUrl, {
      post
    })
      .then(resolve, reject)
      .catch(fetchHasThrown);
  });
}
