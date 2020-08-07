import React from "react";
import GlobalStyle, { OptionsStyle } from "../../components/GlobalStyles";
import Brand from "../../components/Brand";
import Section from "../../components/Section";
import Title from "../../components/Title";
import UserForm from "./UserForm";
import Options from "./Options";
import Services from "./Services";

function OptionsPage() {
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
      <Section>
        <Title>Servicios</Title>
        <Services />
      </Section>
    </>
  );
}

export default OptionsPage;
