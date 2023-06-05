import { Instance, Instances, Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, DoubleSide, MathUtils } from "three";

const INSTANCE = 240;

const SpeedShape = () => {
  const ref = useRef();

  // define random position
  let randomPosition = {
    x: 0,
    y: 0,
    z: 0,
  };

  let randomSpeed = 0;

  const resetRandom = () => {
    randomPosition = {
      x: MathUtils.randFloatSpread(8),
      y: MathUtils.randFloatSpread(5),
      z: MathUtils.randFloatSpread(8),
    };
    randomSpeed = MathUtils.randFloat(16, 20);
  };

  resetRandom();

  useFrame((_state, delta) => {
    // we increase the z position by multiply the random speed with delta

    if (ref.current) {
      ref.current.position.z += randomSpeed * delta;
      // check if the position is behind our camera position
      if (ref.current.position.z > 5) {
        resetRandom();
        ref.current.position.z = randomPosition.z;
      }
    }
  });

  return (
    <Instance
      ref={ref}
      color={"white"}
      position={[randomPosition.x, randomPosition.y, randomPosition.z]}
      rotation-y={Math.PI / 2}
    />
  );
};

export const Speed = () => {
  const MAX_OPACITY = 0.1;
  const speedMaterial = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  useFrame((_state, delta) => {
    // if scroll is fast, change the speed indicator opacity
    if (scroll.offset - lastScroll.current > 0.0005) {
      speedMaterial.current.opacity = MAX_OPACITY;
    }
    lastScroll.current = scroll.offset;

    // make the speed indicator disappear at every frame
    if (speedMaterial.current.opacity > 0) {
      speedMaterial.current.opacity -= delta * 0.2;
    }
  });

  return (
    <group>
      <Instances>
        <planeGeometry args={[1, 0.004]} />
        <meshBasicMaterial
          ref={speedMaterial}
          side={DoubleSide}
          blending={AdditiveBlending}
          opacity={0}
          transparent
        />
        {Array(INSTANCE)
          .fill()
          .map((_, key) => (
            <SpeedShape key={key} />
          ))}
      </Instances>
    </group>
  );
};
