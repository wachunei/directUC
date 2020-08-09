import styled from "styled-components";

const Service = styled.div`
  background-color: ${({ theme }) => theme.colors.serviceBackground};
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.horizontalSeparator};
    padding-bottom: 20px;
  }
  margin-bottom: 20px;
`;

export default Service;
