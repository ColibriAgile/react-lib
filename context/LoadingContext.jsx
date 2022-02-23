import React from 'react';
import {usePromiseTracker} from "react-promise-tracker";

const LoadingContext = React.createContext({
  isLoading: false,
  setLoading: () => {}
});

function LoadingProvider(props) {
  const { promiseInProgress } = usePromiseTracker();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(promiseInProgress);
  }, [promiseInProgress]);

  const value = {
    isLoading,
    setIsLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {props.children}
    </LoadingContext.Provider>
  );
}

export { LoadingContext, LoadingProvider };