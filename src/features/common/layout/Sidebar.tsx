import { Button } from "@blueprintjs/core";
import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";

import NavigationBar from "./NavigationBar";
import { useLocalStorage } from "../local_storage/useLocalStorage";

const Sidebar: FC = () => {
  const [reduced, setReduced] = useLocalStorage("sidebar_reduced", false);

  const handleButton = () => setReduced(!reduced);

  return (
    <aside className={reduced ? "sidebar--reduced" : "sidebar"}>
      <NavigationBar />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          icon={reduced ? IconNames.CHEVRON_RIGHT : IconNames.CHEVRON_LEFT}
          minimal
          onClick={handleButton}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
