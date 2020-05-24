import { css } from 'styled-components';

const theme = {
  SNIPPETS: {
    FONT_FAMILY: css`
      font-family: 'Nunito', sans-serif;
    `
  },

  COLOR: {
    PRIMARY_COLOR: '#ffcd00',
    BACKGROUND_COLOR: '#fcf7ee',
    BLACK: '#000'
  }
};

export default function configureTheme() {
  return theme;
}
