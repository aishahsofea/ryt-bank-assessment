import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";

export type BiometricType =
  | "Fingerprint"
  | "Face ID"
  | "Face Recognition"
  | "Biometric"
  | "None";

type BiometricAvailability = {
  available: boolean;
  biometricType: BiometricType;
  error?: string;
};

export type BiometricAuthResult = {
  success: boolean;
  biometricType?: BiometricType;
  error?: string;
};

const isBiometricSupported = async () => {
  try {
    return await LocalAuthentication.hasHardwareAsync();
  } catch (error) {
    console.error("Error checking biometric support:", error);
    return false;
  }
};

const isBiometricEnrolled = async () => {
  try {
    return await LocalAuthentication.isEnrolledAsync();
  } catch (error) {
    console.error("Error checking biometric enrollment:", error);
    return false;
  }
};

const getBiometricType = async (): Promise<BiometricType> => {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

  if (types.length === 0) {
    return "Biometric";
  }

  const primaryType = types[0];

  switch (primaryType) {
    case LocalAuthentication.AuthenticationType.FINGERPRINT:
      return "Fingerprint";
    case LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION:
      return Platform.OS === "ios" ? "Face ID" : "Face Recognition";
    default:
      return "Biometric";
  }
};

export const isBiometricAvailable =
  async (): Promise<BiometricAvailability> => {
    const isSupported = await isBiometricSupported();

    if (!isSupported) {
      return {
        available: false,
        biometricType: "None",
        error: "Device does not support biometric authentication.",
      };
    }

    const isEnrolled = await isBiometricEnrolled();

    if (!isEnrolled) {
      return {
        available: false,
        biometricType: "None",
        error: "No biometric authentication is set up on this device.",
      };
    }

    const biometricType = await getBiometricType();

    return {
      available: true,
      biometricType,
    };
  };

export const authenticateWithBiometrics = async (
  reason: string = "Authenticate to complete the transfer"
): Promise<BiometricAuthResult> => {
  try {
    const biometricType = await getBiometricType();

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: reason,
      fallbackLabel: "Use Passcode",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
    });

    if (result.success) {
      return { success: true, biometricType };
    } else {
      let errorMessage = "Authentication failed.";

      switch (result.error) {
        case "user_cancel":
          errorMessage = "Authentication was cancelled by the user.";
          break;
        case "system_cancel":
          errorMessage = "Authentication was cancelled by the system.";
          break;
        case "lockout":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "not_enrolled":
          errorMessage = "No biometric authentication is enrolled.";
          break;
        default:
          errorMessage = "Authentication failed. Please try again.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  } catch (error: any) {
    console.error("Biometric authentication error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during authentication.",
    };
  }
};
