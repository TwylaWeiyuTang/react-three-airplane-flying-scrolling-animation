import {
  fadeOnBeforeCompile,
  fadeOnBeforeCompileFlat,
} from "@/utils/fadeMaterials";
import { Text } from "@react-three/drei";
import React from "react";

const TextSection = ({ title, subtitle, ...props }) => {
  return (
    <group {...props}>
      {!!title && (
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"bottom"}
          fontSize={0.52}
          maxWidth={2.5}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          {title}
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}
      <Text
        color={"white"}
        anchorX={"left"}
        anchorY={"top"}
        position-y={-0.2}
        fontSize={0.22}
        maxWidth={2.5}
        font={"./fonts/NexaBook.otf"}
      >
        {subtitle}
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
    </group>
  );
};

export default TextSection;
