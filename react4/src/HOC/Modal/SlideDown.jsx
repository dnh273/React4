import React from "react";
import { useSpring, animated, config } from "react-spring";

export default function SlideDown(Component) {
  const propsSpring = useSpring({
    to: { marginTop: "0" },
    from: { marginTop: "-100px" },
    config: {
      duration: 2000,
    },
  });

  return (
    <div>
      <animated.div style={propsSpring}>
        <Component></Component>
      </animated.div>
    </div>
  );
}
