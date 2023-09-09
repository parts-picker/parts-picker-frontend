import { FC, useState } from "react";
import ProjectModel from "../models/ProjectModel";
import PartsListMainView from "./PartsListMainView";
import { NullableRequiredItemType } from "../../workflow/models/RequiredItemTypeModel";
import PartsListItemTypeView from "./PartsListItemTypeView";
import { useDidUpdate } from "../../common/hooks/useDidUpdate";

interface PartsListViewProps {
  project: ProjectModel;
}

const PartsListView: FC<PartsListViewProps> = ({ project }) => {
  const [detailedRequiredItemType, setDetailedRequiredItemType] =
    useState<NullableRequiredItemType>(null);

  // reset detailed item type if project changed
  useDidUpdate(() => {
    setDetailedRequiredItemType(null);
  }, [project]);

  return (
    <>
      {detailedRequiredItemType ? (
        <PartsListItemTypeView
          requiredItemType={detailedRequiredItemType}
          setDetailedRequiredItemType={setDetailedRequiredItemType}
        />
      ) : (
        <PartsListMainView
          project={project}
          setDetailedRequiredItemType={setDetailedRequiredItemType}
        />
      )}
    </>
  );
};

export default PartsListView;
