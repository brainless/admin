/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";
import Home from "./routes/Home";
import QueryBrowser from "./routes/QueryBrowser";
import { SettingsWrapper, SettingsRoutes } from "./routes/Settings";
import UserAccountForm from "./routes/UserAccountForm";
import { ChatRoutes, ChatWrapper } from "./routes/Chat";
import DirectoryBrowser from "./routes/DirectoryBrowser";
import SearchResultsWrapper from "./routes/SearchResults";
import Graph from "./routes/Graph";

render(
  () => (
    <Router root={App}>
      <Route path={"/browse"} component={QueryBrowser} />
      <Route path="/directory/:directoryId/" component={DirectoryBrowser} />
      <Route path={"/settings"} component={SettingsWrapper}>
        <SettingsRoutes />
      </Route>
      <Route path={"/user"} component={UserAccountForm} />
      <Route path={"/chat"} component={ChatWrapper}>
        <ChatRoutes />
      </Route>
      <Route path={"/search/:searchType"} component={SearchResultsWrapper} />
      <Route path={"/graph"} component={Graph} />
      <Route path={"/"} component={Home} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
