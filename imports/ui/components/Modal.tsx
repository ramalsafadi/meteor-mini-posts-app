import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* The grayed-out background */
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: opacity 200ms ease-in-out;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  min-width: 320px;
  max-width: 500px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackdrop $isOpen={isOpen} onClick={onClose}>
      {/* Stop propagation so clicking inside the modal doesn't close it */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalBackdrop>
  );
};