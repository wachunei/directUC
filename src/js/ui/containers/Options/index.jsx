import React, { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import GlobalStyle, { OptionsStyle } from "../../components/GlobalStyles";
import Brand from "../../components/Brand";
import Section from "../../components/Section";
import Title from "../../components/Title";
import UserForm from "./UserForm";
import Options from "./Options";
import Services from "./Services";

function OptionsPage() {
  const { page } = useAnalytics();

  useEffect(() => {
    page();
  }, []);

  return (
    <>
      <GlobalStyle />
      <OptionsStyle />
      <Section>
        <Brand width="120" />
      </Section>
      <Section>
        <Title>Usuario</Title>
        <UserForm />
      </Section>
      <Section>
        <Title>Opciones</Title>
        <Options />
      </Section>
      <Services />
    </>
  );
}

export default OptionsPage;
