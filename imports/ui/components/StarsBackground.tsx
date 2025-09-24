import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

// 1. Define the animation for a single star falling
const fall = keyframes`
  from {
    transform: translateY(-10vh); /* Start just above the screen */
    opacity: 1;
  }
  to {
    transform: translateY(110vh); /* End just below the screen */
    opacity: 0;
  }
`;

// 2. Define the container that will hold all the stars
const StarsContainer = styled.div`
  position: fixed; /* Fix it to the viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Hide stars that go outside the viewport */
  z-index: 1; /* CRITICAL: Place it behind all other content */
`;

// 3. Define the style for a single star
// We pass props to it for randomization
interface StarProps {
  size: number;
  left: number;
  duration: number;
  delay: number;
}

const Star = styled.div<StarProps>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: black;
  border-radius: 50%;
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.22); /* A subtle glow */
  top: 0; /* Start at the top */
  left: ${({ left }) => left}vw; /* Random horizontal position */
  
  /* Apply the animation with random duration and delay */
  animation: ${fall} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

export const StarsBackground = () => {
  const starCount = 50; 


  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, index) => ({
      id: index,
      size: Math.floor(Math.random() * 3) + 1, 
      left: Math.random() * 100,               
      duration: Math.random() * 10 + 5,         
      delay: Math.random() * 10,                
    }));
  }, [starCount]);

  return (
    <StarsContainer>
      {stars.map(star => (
        <Star
          key={star.id}
          size={star.size}
          left={star.left}
          duration={star.duration}
          delay={star.delay}
        />
      ))}
    </StarsContainer>
  );
};