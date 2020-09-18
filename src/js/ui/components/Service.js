import styled from "styled-components";

const Service = styled.div`
  background-color: ${({ theme }) => theme.serviceBackground};
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.horizontalSeparator};
    padding-bottom: 20px;
  }
  margin-bottom: 20px;
  opacity: ${({ dragging }) => (dragging ? 0.3 : 1)};
`;

export default Service;
