import { Platform } from "react-native";

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const theme = {
  colorPrimary: "#0000E6",
  colorPrimaryShadow: "#4F46E5",
  colorTextPrimary: "#ECEDEE",
  colorTextSecondary: "#6B7280",
  colorBackground: "#151718",
  colorGrey: "#9BA1A6",
  colorGreenLight: "#D1FAE5",
  colorRedLight: "#FEE2E2",
  colorDisabledGrey: "#D1D5DB",
  colorSuccessBackground: "#10B981",
  colorSuccessText: "#059669",
  colorErrorText: "#DC2626",
};
