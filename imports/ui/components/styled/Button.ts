import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
}

export const Button = styled.button<ButtonProps>`
  height: 44px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fonts.sizes.bodyLarge};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 200ms ease-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.9;
  }

  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'destructive':
        return css`
          background-color: ${theme.colors.error};
          color: ${theme.colors.surface};
          border-color: ${theme.colors.error};
        `;
      case 'secondary':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          &:hover {
            background-color: #F0F8FF;
            opacity: 1;
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.surface};
          border-color: ${theme.colors.primary};
        `;
    }
  }}
`;