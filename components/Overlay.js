import styled from "styled-components";
import localFont from "next/font/local";
import { useProgress } from "@react-three/drei";
import { usePlay } from "@/contexts/Play";

const dm = localFont({ src: "./fonts/DMSerifDisplay-Regular.ttf" });
const nexa = localFont({ src: "./fonts/NexaBook.otf" });

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;

  &.overlay-disabled {
    pointer-events: none;
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  transition: opacity 2s ease-in-out;

  &.loader-disappear {
    opacity: 0;
  }
`;

const Logo = styled.h1`
  font-family: ${dm.style.fontFamily};
  color: white;
  font-size: 8rem;
  letter-spacing: 0.5rem;
  padding: 0;
  margin: 0;
  transform: translateY(-50%);
  position: absolute;
  top: 50vh;
  animation: fadeUp 2.4s ease-in-out;
  transition: all 2s ease-in-out;

  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(100px);
      filter: blur(9px);
    }

    100% {
      opacity: 1;
      filter: none;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 3rem;
    letter-spacing: 0.25rem;
  }
`;

const Spinner = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  margin-right: -42px;
  margin-top: -42px;
  animation: fadeIn 2.4s ease-in-out 1.2s forwards;
  opacity: 0;
  z-index: -1;
`;

const SpinnerImg = styled.div`
  width: 164px;
  height: 164px;
  background-size: contain;
  background-image: url("/images/circularText.svg");
  animation: rotate 10s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @media screen and (max-width: 768px) {
    width: 82px;
    height: 82px;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  font-family: ${dm.style.fontFamily};
  font-size: 1.25rem;
  letter-spacing: 0.25rem;
  color: #3535cc;
  border-radius: 32px;
  cursor: pointer;
  display: inline-block;
  margin-top: 320px;
  display: inline-block;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: 0.42s ease-in-out;
  animation: fadeIn 2.4s ease-in-out 2s forwards;
  opacity: 0;

  ::before {
    content: "";
    background: #3535cc;
    position: absolute;
    width: 0%;
    bottom: 0;
    left: 50%;
    height: 0%;
    transition: 0.42s ease-in-out;
    z-index: -1;
    border-radius: 50%;
    transform: translateX(-50%) translateY(50%);
  }

  :hover {
    color: white;
  }

  :hover::before {
    width: 200%;
    height: 300%;
    border-radius: 100%;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const Intro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;

  &.intro-disappear {
    ${Logo} {
      top: 42px;
      transform: scale(0.25);
      transform-origin: center top;
      @media screen and (max-width: 768px) {
        top: 24px;
        transform: scale(0.5);
        transform-origin: center top;
      }
    }

    ${Spinner}, ${Button} {
      opacity: 1;
      animation: fadeOut 1s ease-in-out forwards;
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }
  }
`;

const Outro = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 4s ease-in-out;

  &.outro-appear {
    opacity: 1;
  }
`;

const Text = styled.div`
  font-family: ${nexa.style.fontFamily};
  font-size: 1.5rem;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Overlay = () => {
  // get loading state
  const { progress } = useProgress();

  const { play, setPlay, end } = usePlay();

  return (
    <Container className={play ? `overlay-disabled` : ``}>
      <Loader className={`${progress === 100 ? "loader-disappear" : ""}`} />
      {progress === 100 && (
        <Intro className={`${play ? "intro-disappear" : ""}`}>
          <Logo>
            Displore
            <Spinner>
              <SpinnerImg />
            </Spinner>
          </Logo>
          <Button onClick={() => setPlay(true)}>Explore</Button>
        </Intro>
      )}
      <Outro className={end ? "outro-appear" : ""}>
        <Text>Wish you had a great flight with us...</Text>
      </Outro>
    </Container>
  );
};

export default Overlay;
