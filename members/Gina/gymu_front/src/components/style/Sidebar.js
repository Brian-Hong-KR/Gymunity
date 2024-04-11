import styled, { css } from "styled-components";

export const Sidebar = styled.div`
  position: fixed; /* 사이드바를 뷰포트에 고정합니다. */
  top: 0; /* 상단에 배치합니다. */
  left: 0; /* 왼쪽에 배치합니다. */
  width: 6.5rem;
  min-height: 100vh;
  @media (min-width: 768px) {
    width: 14rem !important;
  }
`;

// export const BackgroundGradientPrimary = styled.div`
//   background-color: var(--red);
//   background-image: linear-gradient(180deg, var(--red) 10%, var(--red) 100%);
//   background-size: cover;
// `;

// export const Accordion = styled.div`
//   overflow-anchor: none;
// `;

// export const NavbarNav = styled.ul`
//   display: flex;
//   flex-direction: column;
//   padding-left: 0;
//   margin-bottom: 0;
//   list-style: none;
// `;

// export const DlOlUl = styled.div`
//   margin-top: 0;
//   margin-bottom: 1rem;
// `;

// export const GlobalStyles = css`
//   * {
//     box-sizing: border-box;
//   }
// `;

// export const UserAgentStyles = css`
//   ul {
//     display: block;
//     list-style-type: disc;
//     margin-block-start: 1em;
//     margin-block-end: 1em;
//     margin-inline-start: 0px;
//     margin-inline-end: 0px;
//     padding-inline-start: 40px;
//     unicode-bidi: isolate;
//   }
//   body {
//     margin: 0;
//     font-family: var(--font-family-sans-serif);
//     font-size: 1rem;
//     font-weight: 400;
//     line-height: 1.5;
//     color: var(--gray);
//     text-align: left;
//     background-color: var(--white);
//   }
//   :root {
//     --blue: #4e73df;
//     --indigo: #6610f2;
//     --purple: #6f42c1;
//     --pink: #e83e8c;
//     --red: #e74a3b;
//     --orange: #fd7e14;
//     --yellow: #f6c23e;
//     --green: #1cc88a;
//     --teal: #20c9a6;
//     --cyan: #36b9cc;
//     --white: #fff;
//     --gray: #858796;
//     --gray-dark: #5a5c69;
//     --primary: #4e73df;
//     --secondary: #858796;
//     --success: #1cc88a;
//     --info: #36b9cc;
//     --warning: #f6c23e;
//     --danger: #e74a3b;
//     --light: #f8f9fc;
//     --dark: #5a5c69;
//     --breakpoint-xs: 0;
//     --breakpoint-sm: 576px;
//     --breakpoint-md: 768px;
//     --breakpoint-lg: 992px;
//     --breakpoint-xl: 1200px;
//     --font-family-sans-serif: "Nunito", -apple-system, BlinkMacSystemFont,
//       "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif,
//       "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
//       "Noto Color Emoji";
//     --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
//       "Liberation Mono", "Courier New", monospace;
//   }
//   html {
//     font-family: sans-serif;
//     line-height: 1.15;
//     -webkit-text-size-adjust: 100%;
//     -webkit-tap-highlight-color: transparent;
//   }
//   * {
//     box-sizing: border-box;
//   }
// `;

// const Sidebar = ({ children, ...props }) => {
//   return <div style={styled}>{children}</div>;
// };

// export default Sidebar;
