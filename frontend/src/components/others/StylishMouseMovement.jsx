/* eslint-disable react/prop-types */
import React from "react";
import gsap from "gsap";
import "./StylishMouseMovement.css";
const { useEffect, useRef, useImperativeHandle, forwardRef } = React;

const StylishMouseMovement = () => {
  const circleRefs = useRef([]);

  // eslint-disable-next-line react/display-name
  const Circle = forwardRef(({ size, delay }, ref) => {
    const el = useRef();

    useImperativeHandle(
      ref,
      () => {
        // return our API
        return {
          moveTo(x, y) {
            gsap.to(el.current, { x, y, delay });
          },
        };
      },
      [delay]
    );

    return <div className={`__stylish_circle ${size}`} ref={el}></div>;
  });

  // reset on re-renders
  circleRefs.current = [];

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    circleRefs.current.forEach((ref) =>
      ref.moveTo(innerWidth / 2, innerHeight / 2)
    );

    const onMove = (e) => {
      const { clientX, clientY } = e;
      // console.log(e.target.tagName);
      if (e.target.tagName === "a") {
        document.querySelector(".__stylish_circle").style.display = "none";
      }
      circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };

    window.addEventListener("pointermove", onMove);

    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const addCircleRef = (ref) => {
    if (ref) {
      circleRefs.current.push(ref);
    }
  };

  return (
    <div className="md:block hidden z-[2]">
      {/* <Circle size="sm" ref={addCircleRef} delay={0} /> */}
      {/* <Circle size="md" ref={addCircleRef} delay={0.1} />
      <Circle size="lg" ref={addCircleRef} delay={0.2} /> */}
    </div>
  );
};

export default StylishMouseMovement;
