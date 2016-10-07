import url from 'url';
import axios from 'axios';


export const apiURLOld = 'http://localhost:8080/api/';
export const apiUrl = (apiPath) => url.resolve(apiURLOld, apiPath);


function fetchHasThrown() {

}

export function fetchPostTypes() {
  const requestUrl = url.resolve(apiURLOld, 'posts/post-types');

  return new Promise((resolve, reject) => {
    fetch(requestUrl)
      .then(response => response.json(), reject)
      .then(resolve)
      .catch(fetchHasThrown);
  });
}

export function fetchPosts(postType) {
  const requestUrl = url.resolve(apiURLOld, `posts/${postType}`);

  return new Promise((resolve, reject) => {
    fetch(requestUrl)
      .then(response => response.json(), reject)
      .then(resolve)
      .catch(fetchHasThrown);
  });
}

export function createNewPost(post, postType) {
  const requestUrl = url.resolve(apiURLOld, `posts/${postType}`);
  console.info('POST:', post);
  return new Promise((resolve, reject) => {
    axios.post(requestUrl, {
      post
    })
      .then(resolve, reject)
      .catch(fetchHasThrown);
  });
}
