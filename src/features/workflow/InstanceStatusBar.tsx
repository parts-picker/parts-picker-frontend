import { Button, ButtonGroup, Callout, Intent } from "@blueprintjs/core";
import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import { InstanceInfo } from "./models/InstanceInfoModel";
import { LinkModel, LinkName } from "../links/types/LinkModel";
import LinkUtil from "../links/LinkUtil";
import { KeyedMutator } from "swr";
import { DisplayType } from "./models/DisplayTypeModel";

interface WorkflowStatusBarProps {
  instanceInfo?: InstanceInfo;
  mutate: KeyedMutator<InstanceInfo>;
}

const chooseOption = (mutate: KeyedMutator<InstanceInfo>, link?: LinkModel) => {
  if (link) {
    mutate(
      fetch(link.href, {
        method: "POST",
      }).then((response) => response.json() as Promise<InstanceInfo>),
      { revalidate: false }
    );
  }
};

const WorkflowStatusBar: FC<WorkflowStatusBarProps> = ({
  instanceInfo,
  mutate,
}) => {
  if (!instanceInfo) {
    return null;
  }

  let intent: Intent = "none";
  switch (instanceInfo.displayType) {
    case DisplayType.INFO:
    case DisplayType.DEFAULT:
      intent = "primary";
      break;
    case DisplayType.WARN:
      intent = "warning";
      break;
    case DisplayType.ERROR:
      intent = "danger";
      break;
  }

  return (
    <Callout
      icon={IconNames.ONE_TO_MANY}
      intent={intent}
      title={instanceInfo.displayName}
    >
      <div className="bp4-text-large">{instanceInfo.message}</div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonGroup>
          {instanceInfo.options?.map((option) => (
            <Button
              key={option.name}
              onClick={() =>
                chooseOption(
                  mutate,
                  LinkUtil.findLink(option, "advance", LinkName.UPDATE)
                )
              }
            >
              {option.displayName}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Callout>
  );
};

export default WorkflowStatusBar;
