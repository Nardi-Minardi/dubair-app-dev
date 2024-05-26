import React, {createContext} from "react";

const LoadingContext = createContext({});

const LoadingHandler = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export {
	LoadingContext,
  LoadingHandler
};