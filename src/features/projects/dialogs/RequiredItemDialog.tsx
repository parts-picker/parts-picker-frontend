import { Button, ControlGroup, Icon, NumericInput } from "@blueprintjs/core";
import { Suggest2 } from "@blueprintjs/select";
import { FC, useState } from "react";
import { IconNames } from "@blueprintjs/icons";
import ProjectModel from "../models/ProjectModel";
import LinkUtil from "../../links/LinkUtil";
import { LinkName } from "../../links/types/LinkModel";
import { SearchAvailableItemTypesResponse } from "../../workflow/models/SearchAvailableItemTypesResponse";
import DefaultLoadingSpinner from "../../common/loading/DefaultLoadingSpinner";
import {
  AvailableItemType,
  NullableAvailableItemType,
} from "../../workflow/models/AvailableItemTypeModel";
import { useSWRWithURILike } from "../../common/utils/swr/useSWRWithURILike";
import { AppToaster } from "../../common/utils/Toaster";
import { KeyedMutator } from "swr";
import { ReadRequiredItemTypesResponse } from "../../workflow/models/ReadRequiredItemTypesResponse";
import ResponseUtil from "../../links/ResponseUtil";
import AvailableItemTypeNoResults from "./components/AvailableItemTypeNoResults";
import AvailableItemTypeItem from "./components/AvailableItemTypeItem";

const DEFAULT_SEARCH_QUERY = "";
const DEFAULT_AMOUNT = 1;

interface RequiredItemDialogProps {
  project: ProjectModel;
  requiredItemTypesMutate: KeyedMutator<ReadRequiredItemTypesResponse>;
}

const RequiredItemDialog: FC<RequiredItemDialogProps> = ({
  project,
  requiredItemTypesMutate,
}) => {
  // dialog state
  const [searchQueryName, setSearchQueryName] =
    useState<string>(DEFAULT_SEARCH_QUERY);
  const [selectedItemType, setSelectedItemType] =
    useState<NullableAvailableItemType>();
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);

  // fetch available item type search result
  const itemTypeSearchLinkTemplate = LinkUtil.findTemplatedLink(
    project,
    "available",
    LinkName.SEARCH
  );

  const { data, mutate } = useSWRWithURILike<SearchAvailableItemTypesResponse>(
    itemTypeSearchLinkTemplate,
    { name: searchQueryName }
  );
  const availableItemTypes = data?._embedded?.availableItemTypes ?? [];

  // util
  if (!project) {
    return <DefaultLoadingSpinner />;
  }

  const resetQuery = () => {
    setSearchQueryName(DEFAULT_SEARCH_QUERY);
  };

  const reset = () => {
    resetQuery();
    setSelectedItemType(null);
    setAmount(DEFAULT_AMOUNT);
  };

  return (
    <>
      <ControlGroup>
        <Suggest2<AvailableItemType>
          items={availableItemTypes}
          selectedItem={selectedItemType}
          onItemSelect={(selectedItem) => {
            setSelectedItemType(selectedItem);
            setSearchQueryName(selectedItem.name);
          }}
          query={searchQueryName}
          onQueryChange={setSearchQueryName}
          itemsEqual={(first, second) =>
            ResponseUtil.equal(first, second, LinkName.READ, "subsetOf")
          }
          itemRenderer={(itemType, props) => {
            return (
              <AvailableItemTypeItem
                availableItemType={itemType}
                itemRendererProps={props}
                key={
                  LinkUtil.findLink(itemType, "subsetOf", LinkName.READ)?.href
                }
              />
            );
          }}
          inputValueRenderer={(itemType) => itemType.name}
          noResults={
            <AvailableItemTypeNoResults searchQueryName={searchQueryName} />
          }
          closeOnSelect
          popoverProps={{ matchTargetWidth: true, minimal: true }}
          inputProps={{
            leftIcon: <Icon icon={IconNames.SEARCH} />,
            style: { width: "25em" },
            onFocus: () => mutate(),
          }}
        />
        <NumericInput
          value={amount}
          onValueChange={setAmount}
          minorStepSize={null}
          min={1}
        />
        <Button
          icon={IconNames.ADD}
          style={{ marginLeft: "2em" }}
          onClick={() => {
            if (selectedItemType) {
              createRequiredItemType(selectedItemType, amount, () => {
                reset();
                requiredItemTypesMutate();
              });
            }
          }}
          disabled={!selectedItemType}
        />
      </ControlGroup>
    </>
  );
};

export default RequiredItemDialog;

// utils
const createRequiredItemType = (
  availableItemType: AvailableItemType,
  requiredAmount: number,
  postCreateAction?: () => void
) => {
  const editRequiredItemTypeLink = LinkUtil.findLink(
    availableItemType,
    "assigned",
    LinkName.CREATE
  );

  if (editRequiredItemTypeLink) {
    fetch(editRequiredItemTypeLink.href, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ requiredAmount: requiredAmount }),
    }).then(() => {
      postCreateAction?.();

      AppToaster?.show?.({
        message: (
          <>
            Added {requiredAmount} of item type <b>{availableItemType.name}</b>{" "}
            as required
          </>
        ),

        intent: "success",
        icon: IconNames.CONFIRM,
      });
    });
  }
};
