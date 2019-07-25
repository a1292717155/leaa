/* eslint-disable no-underscore-dangle */

const headerMenu = [
  // {
  //   title: 'Article',
  //   link: 'article',
  // },
  {
    title: 'Ram',
    link: 'ram',
  },
  {
    title: 'Blog',
    link: 'blog',
  },
  {
    title: 'Article',
    link: 'article',
  },
];

const footerMenu = [
  {
    title: 'Product',
    link: 'ram',
    chlidren: [
      { title: 'Product Ram', link: 'ram' },
      { title: 'Product Blog', link: 'blog' },
      { title: 'Product Article', link: 'article' },
      { title: 'Product D', link: 'ram' },
    ],
  },
  {
    title: 'Feature',
    link: 'ram',
    chlidren: [
      { title: 'Feature A', link: 'ram' },
      { title: 'Feature B', link: 'ram' },
      { title: 'Feature C', link: 'ram' },
      { title: 'Feature D', link: 'ram' },
    ],
  },
  {
    title: 'Service',
    link: 'ram',
    chlidren: [
      { title: 'Service A', link: 'ram' },
      { title: 'Service B', link: 'ram' },
      { title: 'Service C', link: 'ram' },
      { title: 'Service D', link: 'ram' },
      { title: 'Service E', link: 'ram' },
    ],
  },
  {
    title: 'About Leaa',
    link: 'ram',
    chlidren: [
      { title: 'Leaa A', link: 'ram' },
      { title: 'Leaa B', link: 'ram' },
      { title: 'Github', link: 'ram' },
      { title: 'Twitter', link: 'ram' },
    ],
  },
];

export const __MENU_MOCK__ = {
  headerMenu,
  footerMenu,
};
