import styled /* , { keyframes } */ from "styled-components";

// const overlayAnimation = keyframes`
//   from {
//     backdrop-filter: blur(0) grayscale(0);
//   }

//   to {
//     backdrop-filter: blur(1px) grayscale(100%);
//   }
// `;

const Overlay = styled.div`
  z-index: 1;
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  margin: 0;
  padding: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px) grayscale(100%);

  ${"" /* animation: ${overlayAnimation} 0.2s linear forwards; */}
`;

export default Overlay;
