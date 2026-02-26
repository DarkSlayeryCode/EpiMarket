"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

// We can pass 'size' as a prop to make it adjustable!
const Logo = ({ size = 150 }) => {
  return (
    <LogoWrapper $size={size}>
      <Link href="/">
        <Image
          src="/basket.png"
          alt="EpiMarket Logo"
          width={size}
          height={size}
          priority
        />
      </Link>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div<{ $size: number }>`
  display: inline-block;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05); /* Just a little pop when hovered */
  }

  img {
    height: auto;
    width: ${(props) => props.$size}px;
  }
`;

export default Logo;
