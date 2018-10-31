import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from "./redux/store";
import { router } from "./router";
import Root from "./App";
import { LoadableState, LoadableStateManager } from "@loadable/server";

const createApp = (context, url, store) => {
  let loadableState;
  const App = () => {
    loadableState = new LoadableState();
    App.loadableState = loadableState;
    return (
      <LoadableStateManager state={loadableState}>
      <Provider store={store}>
        <StaticRouter context={context} location={url}>
          <Root setHead={(head) => App.head = head}/>  
        </StaticRouter>
      </Provider>
      </LoadableStateManager>
    )
  }
  return <App />;
}

export {
  createApp,
  createStore,
  router
};
