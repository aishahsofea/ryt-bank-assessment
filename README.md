# Welcome to the Payment Transfer App 👋

This is a simple mobile application built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev) that allows users to transfer money to their contacts. The app features a user-friendly interface, secure transaction processing, and real-time updates on transfer status.

## App Demo

https://github.com/user-attachments/assets/674c4b9a-9778-4e4a-a587-a0c0c4c22c64



## Tech Stack

| Category             | Technology                       |
| -------------------- | -------------------------------- |
| **Framework**        | React Native (Expo)              |
| **Language**         | TypeScript                       |
| **Navigation**       | Expo Router (File-based routing) |
| **State Management** | Zustand + TanStack Query         |
| **Biometric Auth**   | expo-local-authentication        |
| **Storage**          | AsyncStorage                     |
| **Icons**            | Ionicons (@expo/vector-icons)    |

## Installation

### Prerequisites

- Node.js (v20 or higher)
- yarn classic

### Setup Steps

1. Clone the repository

   ```bash
   git clone git@github.com:aishahsofea/ryt-bank-assessment.git
   cd ryt-bank-assessment
   ```

1. Install dependencies

   ```bash
   yarn
   ```

1. Start the Expo development server

   ```bash
   yarn start
   ```

1. Run on device or simulator
   - For iOS: Press `i` in the terminal to open in iOS Simulator.
   - For Android: Press `a` in the terminal to open in Android Emulator.
   - Alternatively, scan the QR code with the Expo Go app on your physical device.

### Project Structure

```ascii
└── ryt-bank-assessment/
    ├── app/              <--- Expo Router screens
    ├── components/       <--- UI components
    ├── constants/        <--- Constant values for theme
    ├── hooks/            <--- Custom React hooks
    ├── lib/              <--- Utility functions and libraries
    ├── providers/        <--- Context providers for state management
    ├── services/         <--- API services
    └── stores/           <--- Zustand stores
```
