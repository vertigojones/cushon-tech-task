import styled from "styled-components"

export const PageContainer = styled.div`
  height: 100vh;
  background-color: #d3007d;
`

export const FormContainer = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
`

export const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1rem;
  color: #1a1a1a;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1a1a1a;
  transition: border-color 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

export const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  aria-live: polite;
`

export const SubmitButton = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
  background-color: ${({ disabled }) => (disabled ? "#9ca3af" : "#2563eb")};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#9ca3af" : "#1d4ed8")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.5);
  }
`

export const SuccessMessage = styled.p`
  color: #059669;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  background-color: #ecfdf5;
  border-radius: 0.5rem;
`
