import styled from "styled-components";
import { isFirefox, version } from "../../../utils";
import Box from "../../components/Box";
import Brand from "../../components/Brand";
import Section from "../../components/Section";

const BrandBox = styled(Box)`
  margin-top: 20px;
`;

const Credits = styled.p`
  opacity: 0.2;
  transition: opacity 0.2s;
`;

const AboutSection = styled(Section)`
  margin-top: 150px;

  &:hover {
    ${Credits} {
      opacity: 1;
    }
  }
`;
const About = () => (
  <AboutSection ghost id="about">
    <Box center>
      <Credits>
        Hecho con{" "}
        <span role="img" aria-label="heart emoji">
          ❤️
        </span>{" "}
        por Pedro Pablo Aste Kompen
      </Credits>
      <small>
        {!isFirefox && (
          <>
            <a
              href="https://github.com/wachunei/directUC/blob/develop/POLICIES.md"
              target="_blank"
              rel="noreferrer"
            >
              Términos, condiciones y política de privacidad
            </a>{" "}
            ·{" "}
          </>
        )}
        <a
          href="https://instagram.com/directUC_"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>{" "}
        ·{" "}
        <a href="https://git.io/directUC" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </small>
    </Box>
    <BrandBox center>
      <Brand width="160px" />
      <small>
        v{version}
        {isFirefox && "-firefox"}
      </small>
    </BrandBox>
  </AboutSection>
);

export default About;
