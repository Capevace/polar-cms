export default {
  render: module => `
    <ul>
      ${module.items.map(item => `<li>${item}</li>`)}
    </ul>
  `,
};
