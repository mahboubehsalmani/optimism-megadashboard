import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        chartPalette: {
          500: "#6a4c93",
          200: "#00bbf9",
          300: "#8ac926",
          400: "#ff595e",
          100: "#f29e4c",
          600: "#43bccd",
          700: "#ee4266",
          800: "#0ead69",
          900: "#9e0059",
        },
        grey: {
          100: "#f8f9fa",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#6c757d",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        // dark blue to light bg
        backgroundColor: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        secondary: {
          100: "#311900",
          200: "#633300",
          300: "#944c00",
          400: "#c66600",
          500: "#f77f00",
          600: "#f99933",
          700: "#fab266",
          800: "#fccc99",
          900: "#fde5cc",
        }, // orange
        secondaryBackground: {
          100: "#db7c2666", //50%
          200: "#db7c264D", // 30%
          300: "#db7c261F", // 12%
          400: "#db7c261A", // 10%
        },
        orangeAccent: {
          100: "#fde5cc",
          200: "#fccc99",
          300: "#fab266",
          400: "#f99933",
          500: "#f77f00",
          600: "#c66600",
          700: "#944c00",
          800: "#633300",
          900: "#311900",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        fontAccent: {
          100: "#dde9fd",
          200: "#bbd4fc",
          300: "#98befa",
          400: "#76a9f9",
          500: "#5493f7",
          600: "#4376c6",
          700: "#325894",
          800: "#223b63",
          900: "#111d31",
        },

        primary: {
          100: "#03045e",
          200: "#023e8a",
          300: "#0077b6",
          400: "#0096c7",
          500: "#00b4d8",
          600: "#48cae4",
          700: "#90e0ef",
          800: "#ade8f4",
          900: "#caf0f8",
        },
      }
    : {
        chartPalette: {
          100: "#f29e4c",
          200: "#00bbf9",
          300: "#8ac926",
          400: "#ff595e",
          500: "#6a4c93",
          600: "#43bccd",
          700: "#ee4266",
          800: "#0ead69",
          900: "#9e0059",
        },
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        backgroundColor: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        secondary: {
          100: "#311900",
          200: "#633300",
          300: "#944c00",
          400: "#c66600",
          500: "#f77f00",
          600: "#f99933",
          700: "#fab266",
          800: "#fccc99",
          900: "#fde5cc",
        }, // orange
        secondaryBackground: {
          100: "#db7c261A", // 10%
          200: "#db7c261F", // 12%
          300: "#db7c264D", // 30%
          400: "#db7c2666", //50%
        },
        orangeAccent: {
          100: "#311900",
          200: "#633300",
          300: "#944c00",
          400: "#c66600",
          500: "#f77f00",
          600: "#f99933",
          700: "#fab266",
          800: "#fccc99",
          900: "#fde5cc",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        primary: {
          100: "#caf0f8",
          200: "#ade8f4",
          300: "#90e0ef",
          400: "#48cae4",
          500: "#00b4d8",
          600: "#0096c7",
          700: "#0077b6",
          800: "#023e8a",
          900: "#03045e",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.orangeAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.backgroundColor[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.orangeAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
