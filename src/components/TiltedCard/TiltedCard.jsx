"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

const TiltedCard = ({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return <>
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >     
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div
            className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]"
          >
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  </>;
};

const App = () => {
  return <>
      <h1 className="text-center text-3xl pb-10">Dive into your year</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 p-6">
     <Link href={""}>
     <TiltedCard
        className=""
        imageSrc="https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg"
        altText="First year"
        captionText="First year"
        // containerHeight="300px"
        // containerWidth="300px"
        // imageHeight="300px"
        // imageWidth="300px"
        scaleOnHover={1.1}
        rotateAmplitude={12}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={<p className="tilted-card-demo-text text-xl ms-3 mt-2">1st</p>}
      /></Link>
      <TiltedCard
        imageSrc="https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        altText="Second year"
        captionText="Second year"
        // containerHeight="300px"
        // containerWidth="300px"
        // imageHeight="300px"
        // imageWidth="300px"
        scaleOnHover={1.2}
        rotateAmplitude={14}
        showMobileWarning={true}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={<p className="tilted-card-demo-text text-xl ms-3 mt-2">2nd</p>}
      />
      <TiltedCard
        imageSrc="https://images.pexels.com/photos/3764402/pexels-photo-3764402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        altText="Third year"
        captionText="Third year"
        // containerHeight="300px"
        // containerWidth="300px"
        // imageHeight="300px"
        // imageWidth="300px"
        scaleOnHover={1.1}
        rotateAmplitude={16}
        showMobileWarning={true}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={<p className="tilted-card-demo-text text-xl ms-3 mt-2">3rd</p>}
      />
      <TiltedCard
        imageSrc="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        altText="Senior year"
        captionText="Senior year"
        // containerHeight="300px"
        // containerWidth="300px"
        // imageHeight="300px"
        // imageWidth="300px"
        scaleOnHover={1.1}
        rotateAmplitude={12}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={<p className="tilted-card-demo-text text-xl ms-3 mt-2">4th</p>}
      />
    </div>
  </>;
};

export default App;
