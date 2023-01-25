import { Button, ButtonGroup, Callout } from "@blueprintjs/core";
import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import { InstanceInfoModel } from "./models/InstanceInfoModel";
import { LinkModel, LinkNames } from "../links/types/LinkModel";
import LinkUtil from "../links/LinkUtil";
import { KeyedMutator } from "swr";

interface WorkflowStatusBarProps {
  instanceInfo?: InstanceInfoModel;
  mutate: KeyedMutator<InstanceInfoModel>;
}

const chooseOption = (
  mutate: KeyedMutator<InstanceInfoModel>,
  link?: LinkModel
) => {
  if (link) {
    mutate(
      fetch(link.href, {
        method: "POST",
      }).then((response) => response.json() as Promise<InstanceInfoModel>),
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

  return (
    <Callout
      icon={IconNames.ONE_TO_MANY}
      intent={"primary"}
      title={instanceInfo.displayName}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonGroup>
          {instanceInfo.options?.map((option) => (
            <Button
              key={option.name}
              onClick={() =>
                chooseOption(
                  mutate,
                  LinkUtil.findLink(option, "advance", LinkNames.UPDATE)
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
