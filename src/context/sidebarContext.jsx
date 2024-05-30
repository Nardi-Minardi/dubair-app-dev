import React, {createContext, useContext, useState} from "react";

const SidebarContext = createContext();

const SidebarPovider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tabActive, setTabActive] = useState('remix');

  const showSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <SidebarContext.Provider value={{ tabActive, setTabActive, isSidebarOpen, showSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useGlobalSidebarContext = () => {
  return useContext(SidebarContext);
};

export { SidebarPovider };