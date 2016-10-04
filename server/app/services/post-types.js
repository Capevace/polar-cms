import fs from 'fs';
import path from 'path';
import config from '../../config';

let themePostTypes = {};

try {
  fs.accessSync(path.join(config.theme.themePath, 'post-types.js'), fs.F_OK);
  themePostTypes = require(path.join(config.theme.themePath, 'post-types.js')).default;
} catch (e) {
    // Silence is golden
}

const postTypes = Object.assign({}, {
  page: {
    slug: 'page',
    name: 'Page',
    labels: {
      singular: 'Page',
      plural: 'Pages',
    },
    grouped: false,
  },
  article: {
    slug: 'article',
    name: 'Article',
    labels: {
      singular: 'Article',
      plural: 'Articles',
    },
    grouped: true,
  },
}, themePostTypes);

export default postTypes;
