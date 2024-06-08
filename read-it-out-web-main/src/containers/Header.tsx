// components

import Wrapper from "components/header/Wrapper";
import Layout, { AutoLayout } from "components/header/Layout";
import Logo from "components/header/Logo";
import ControlBtn from "components/header/ControlBtn";
import styled from "styled-components";
import * as styles from "lib/styles/styles";
import palette from "lib/styles/palette";
import CloseIcon2 from "./CloseIcon2";

const Header = ({
  onSend,
  onset,
  onNavToggle,
  onOptionToggle,
  onLearningToggle,
  isSpeech,
}: Props) => {
  console.log(onSend);

  return (
    <Wrapper>
      <Layout>
        <AutoLayout>
          <Logo />
          <div>
            {isSpeech !== "Android" && (
              <ControlBtn message="Speech" onClick={onset} />
            )}
            <ControlBtn message="Contents" onClick={onNavToggle} />
            <ControlBtn message="Setting" onClick={onOptionToggle} />
            <ControlBtn message="Highlights" onClick={onLearningToggle} />
            {isSpeech !== "Android" && <CloseIcon2 />}
            {/* <Speech1 data={yyy} /> */}
            {/* <Speech stop={true} pause={true} resume={true} /> */}
          </div>
        </AutoLayout>
      </Layout>
    </Wrapper>
  );
};

interface Props {
  onSend: any;
  onset: (value?: boolean) => void;
  onNavToggle: (value?: boolean) => void;
  onOptionToggle: (value?: boolean) => void;
  onLearningToggle: (value?: boolean) => void;
  isSpeech?: any;
  // stop : (value?: boolean) => void;
}

export default Header;
