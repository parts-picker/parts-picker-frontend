import {
  Button,
  ButtonGroup,
  Callout,
  Classes,
  Intent,
} from "@blueprintjs/core";
import { FC } from "react";
import { IconNames } from "@blueprintjs/icons";
import { InstanceInfo } from "./models/InstanceInfoModel";
import { LinkModel, LinkName } from "../links/types/LinkModel";
import LinkUtil from "../links/LinkUtil";
import { KeyedMutator } from "swr";
import { DisplayType } from "./models/DisplayTypeModel";
import { AuthedFetch } from "../common/utils/swr/DefaultFetcher";
import { useAuthedFetch } from "../common/security/hooks/useAuthedFetch";

interface WorkflowStatusBarProps {
  instanceInfo?: InstanceInfo;
  instanceMutate: KeyedMutator<InstanceInfo>;
  optionalMutates?: Array<KeyedMutator<unknown>>;
}

const chooseOption = (
  authedFetch: AuthedFetch,
  instanceMutate: KeyedMutator<InstanceInfo>,
  optionalMutates?: Array<KeyedMutator<unknown>>,
  link?: LinkModel
) => {
  if (link) {
    instanceMutate(
      authedFetch<InstanceInfo>(link.href, {
        method: "POST",
      }),
      { revalidate: false }
    ).then(() => {
      optionalMutates?.forEach((mutate) => {
        mutate();
      });
    });
  }
};

const WorkflowStatusBar: FC<WorkflowStatusBarProps> = ({
  instanceInfo,
  instanceMutate,
  optionalMutates,
}) => {
  const authedFetch = useAuthedFetch();
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
      <div className={Classes.TEXT_LARGE}>{instanceInfo.message}</div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonGroup>
          {instanceInfo.options?.map((option) => (
            <Button
              key={option.name}
              onClick={() =>
                chooseOption(
                  authedFetch,
                  instanceMutate,
                  optionalMutates,
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
