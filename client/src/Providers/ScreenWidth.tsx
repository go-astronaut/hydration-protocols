import { useState, useEffect, createContext, useContext } from "react";

const ScreenWidthContext = createContext<{ screenWidth: number }>({
  screenWidth: 0,
});

/**
 * Provider to get the screenWidth
 * @param children
 */
function ScreenWidthProvider({ children }: { children: React.ReactNode }) {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  // update screenWidth on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenWidthContext.Provider value={{ screenWidth }}>
      {children}
    </ScreenWidthContext.Provider>
  );
}

/**
 * hook to get the screenWidth
 * @returns screenWidth
 */
export const useScreenWidth = () => {
  const { screenWidth } = useContext(ScreenWidthContext);
  return { screenWidth };
};

export default ScreenWidthProvider;
