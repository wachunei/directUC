import styled from "styled-components";
import Button from "../../components/Button";

const ServiceContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

function Service(props) {
  return (
    <ServiceContainer>
      <Button block primary {...props} />
    </ServiceContainer>
  );
}

export default Service;
