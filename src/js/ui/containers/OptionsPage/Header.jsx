import React from "react";
import styled from "styled-components";
import { version } from "../../../utils";

import Box from "../../components/Box";
import Brand from "../../components/Brand";
import Section from "../../components/Section";

const CenterBrand = styled(Brand)`
  vertical-align: middle;
`;

const Version = styled.a`
  opacity: 0;
  transition: opacity 0.2s;
  color: ${({ theme }) => theme.body};
  text-decoration: none;
`;

const HeaderSection = styled(Section)`
  &:hover {
    ${Version} {
      opacity: 1;
    }
  }
`;
const Header = () => (
  <HeaderSection>
    <Box horizontal between middle>
      <CenterBrand width="120" />
      <Version href="#about">
        <small>v{version}</small>
      </Version>
    </Box>
  </HeaderSection>
);
export default Header;
