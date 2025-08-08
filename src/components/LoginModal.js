import React, { useState } from 'react';
import styled from 'styled-components';
import { X, Lock, User, Eye, EyeOff } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%);
  border: 1px solid #ff0066;
  border-radius: 12px;
  width: 400px;
  padding: 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 0, 102, 0.3);
  position: relative;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(255, 0, 102, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #ff0066, transparent);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  color: #ccc;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  background: rgba(255, 0, 102, 0.1);
  border: 1px solid rgba(255, 0, 102, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  padding-left: 44px;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff0066;
    background: rgba(255, 0, 102, 0.15);
    box-shadow: 0 0 20px rgba(255, 0, 102, 0.3);
  }
  
  &::placeholder {
    color: #666;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: #ff0066;
  z-index: 1;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff0066;
  }
`;

const LoginButton = styled.button`
  background: rgba(255, 0, 102, 0.2);
  color: #ff0066;
  border: 1px solid #ff0066;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 0 20px rgba(255, 0, 102, 0.3);
  
  &:hover {
    background: rgba(255, 0, 102, 0.3);
    box-shadow: 0 0 30px rgba(255, 0, 102, 0.5);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 12px;
  text-align: center;
  padding: 8px;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 6px;
`;

const LoginDescription = styled.p`
  color: #888;
  font-size: 13px;
  text-align: center;
  margin: 0 0 20px 0;
  line-height: 1.4;
`;

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      // Simple credential check (in production, this would be a secure API call)
      if (credentials.username === 'organizer' && credentials.password === 'blockchain2025') {
        onLogin({
          username: credentials.username,
          role: 'organizer',
          name: 'Event Organizer'
        });
        onClose();
      } else {
        setError('Credenciais inválidas. Acesso apenas para organizadores.');
      }
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderContent>
            <ModalTitle>
              <Lock size={20} />
              Acesso de Organização
            </ModalTitle>
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>
          </HeaderContent>
        </ModalHeader>
        
        <ModalBody>
          <LoginDescription>
            Área restrita para organizadores do evento. 
            Faça login para acessar o painel de controle.
          </LoginDescription>
          
          <LoginForm onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Usuário</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <User size={16} />
                </InputIcon>
                <StyledInput
                  type="text"
                  name="username"
                  placeholder="Digite seu usuário"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                />
              </InputWrapper>
            </InputGroup>
            
            <InputGroup>
              <InputLabel>Senha</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <Lock size={16} />
                </InputIcon>
                <StyledInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Digite sua senha"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </PasswordToggle>
              </InputWrapper>
            </InputGroup>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Acessar Painel'}
            </LoginButton>
          </LoginForm>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
