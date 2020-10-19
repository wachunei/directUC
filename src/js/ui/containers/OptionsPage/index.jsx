import { useEffect } from "react";
import { useAnalytics } from "use-analytics";
import GlobalStyle, { OptionsStyle } from "../../components/GlobalStyles";
import Section from "../../components/Section";
import Title from "../../components/Title";

import Header from "./Header";
import UserForm from "./UserForm";
import Options from "./Options";
import Services from "./Services";
import About from "./About";

function OptionsPage() {
  const { page } = useAnalytics();

  useEffect(() => {
    page();
  }, [page]);

  return (
    <>
      <GlobalStyle />
      <OptionsStyle />
      <Header />
      <Section>
        <Title>Usuario</Title>
        <UserForm />
      </Section>
      <Section>
        <Title>Opciones</Title>
        <Options />
      </Section>
      <Services />
      <About />
    </>
  );
}

export default OptionsPage;
