import path from 'path';

export const active = 'default';

export const themePath = path.resolve(`server-build/themes/${active}`);

export const themeConfig = require(`${themePath}/config.js`);

export const themeViewFolder = `${themePath}/views`;
