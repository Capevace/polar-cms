import fs from 'fs';
import path from 'path';
import config from '../../config';
import console from 'better-console';

let themePostTypes = {};

try {
  fs.accessSync(path.join(config.theme.themePath, 'post-types.js'), fs.F_OK);
  themePostTypes = require(path.join(config.theme.themePath, 'post-types.js')).default;
} catch (e) {
    // Silence is golden
  console.error('Error getting theme post types', e);
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
    fields: ['content', 'excerpt', 'tags'],
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
