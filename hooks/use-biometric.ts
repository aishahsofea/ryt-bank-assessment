import {
  authenticateWithBiometrics,
  BiometricAuthResult,
  BiometricType,
  isBiometricAvailable,
} from "@/lib/biometric";
import { useEffect, useState } from "react";

export const useBiometric = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<BiometricType>("None");

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    const result = await isBiometricAvailable();
    setIsAvailable(result.available);
    setBiometricType(result.biometricType);
  };

  const authenticate = async (
    reason?: string
  ): Promise<BiometricAuthResult> => {
    return await authenticateWithBiometrics(reason);
  };

  return {
    isAvailable,
    biometricType,
    authenticate,
  };
};
