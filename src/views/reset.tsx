import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../components/InputField';
import { resetPassword } from '../service/PasswordResetService';
import './reset.css';

const ResetPasswordScreen: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const navigate = useNavigate();
  const { token: paramToken } = useParams();

  useEffect(() => {
    if (paramToken) {
      setToken(paramToken);
    }
  }, [paramToken]);

  const handleResetPassword = async () => {
    if (!token) {
      alert('Token inválido o expirado');
      return;
    }

    if (!newPassword.trim()) {
      alert('Por favor ingresa tu nueva contraseña');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await resetPassword(token, newPassword);
      if (result.success) {
        alert('Tu contraseña ha sido actualizada correctamente');
        setTimeout(() => {
          navigate('/loginScreen');
        }, 2000);
      } else {
        if (result.errorCode === 401) {
          setTokenExpired(true);
          alert('El enlace ha expirado o no es válido');
        } else {
          alert(result.message);
        }
      }
    } catch (error) {
      alert('Ocurrió un error inesperado');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="resetScreen">
      <div className="resetContainer">
        <h1 className="resetTitle">Crear Nueva Contraseña</h1>
        {tokenExpired ? (
          <>
            <p className="resetText">
              El enlace ha expirado o no es válido. Por favor solicita un nuevo enlace para restablecer tu contraseña.
            </p>
            <button
              className="resetButton"
              onClick={() => navigate('/forgotPassword')}
            >
              Solicitar Nuevo Enlace
            </button>
          </>
        ) : (
          <>
            <p className="resetText">
              Ingresa tu nueva contraseña para tu cuenta.
            </p>
            <InputField
              placeholder="Nueva Contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={(val: string) => setNewPassword(val)}
            />
            <InputField
              placeholder="Confirmar Contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(val: string) => setConfirmPassword(val)}
            />
            <button
              className="resetButton"
              onClick={handleResetPassword}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Actualizar Contraseña'}
            </button>
          </>
        )}
       
      </div>
    </div>
  );
};

export default ResetPasswordScreen;