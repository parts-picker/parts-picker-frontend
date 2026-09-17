"use client";

import { Button, Icon, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {
  ItemListRenderer,
  ItemRenderer,
  renderFilteredItems,
  Select,
} from "@blueprintjs/select";
import { useRouter } from "next/navigation";
import { FC, UIEvent, useState } from "react";
import LinkUtil from "@/features/links/LinkUtil";
import { LinkName } from "@/features/links/types/LinkModel";
import ResponseUtil from "@/features/links/ResponseUtil";
import { useCurrentOrgUnit } from "@/features/orgUnits/CurrentOrgUnitContext";
import { useOrgUnitMemberships } from "@/features/orgUnits/hooks/useOrgUnitMemberships";
import OrgUnitMembershipModel from "@/features/orgUnits/models/OrgUnitMembershipModel";
import {
  ORG_UNIT_ICON,
  ORG_UNITS_PATH,
} from "@/features/orgUnits/OrgUnitConstants";
import { routeToOrgUnit } from "@/features/orgUnits/util/OrgUnitRoutingUtil";

// how close to the end of the list the next page is requested, about two items
const LOAD_MORE_DISTANCE_PX = 80;

const OrgUnitSwitcher: FC = () => {
  const router = useRouter();
  const { memberships, hasMore, isLoadingMore, loadMore } =
    useOrgUnitMemberships();
  const { currentOrgUnit } = useCurrentOrgUnit();

  const isCurrent = (membership: OrgUnitMembershipModel) =>
    currentOrgUnit !== undefined &&
    ResponseUtil.equal(membership, currentOrgUnit, LinkName.READ, "self");
  const currentMembership = memberships.find(isCurrent);
  // keyboard navigation moves the active item, starting from the current org unit
  const [activeMembership, setActiveMembership] =
    useState<OrgUnitMembershipModel | null>(null);

  const renderMembership: ItemRenderer<OrgUnitMembershipModel> = (
    membership,
    { handleClick, handleFocus, modifiers }
  ) => (
    <MenuItem
      key={LinkUtil.findLink(membership, "self", LinkName.READ)?.href}
      text={membership.orgUnit.name}
      roleStructure="listoption"
      active={modifiers.active}
      selected={isCurrent(membership)}
      onClick={handleClick}
      onFocus={handleFocus}
    />
  );

  // the next page is requested once the list is scrolled close to its end
  const handleListScroll = (event: UIEvent<HTMLUListElement>) => {
    const list = event.currentTarget;
    const distanceToEnd =
      list.scrollHeight - list.scrollTop - list.clientHeight;

    if (hasMore && !isLoadingMore && distanceToEnd < LOAD_MORE_DISTANCE_PX) {
      loadMore();
    }
  };

  // the org units scroll on their own, the overview entry stays visible below them
  const renderOrgUnitList: ItemListRenderer<OrgUnitMembershipModel> = (
    listProps
  ) => (
    <>
      <Menu
        size="large"
        ulRef={listProps.itemsParentRef}
        onScroll={handleListScroll}
        {...listProps.menuProps}
      >
        {renderFilteredItems(listProps)}
        {isLoadingMore ? <MenuItem text={"Loading..."} disabled /> : null}
      </Menu>
      <Menu size="large">
        <MenuDivider />
        <MenuItem
          icon={IconNames.LIST}
          text={"View all org units"}
          onClick={() => router.push(ORG_UNITS_PATH)}
        />
      </Menu>
    </>
  );

  return (
    <Select<OrgUnitMembershipModel>
      items={memberships}
      activeItem={activeMembership ?? currentMembership ?? null}
      onActiveItemChange={setActiveMembership}
      itemsEqual={(first, second) =>
        ResponseUtil.equal(first, second, LinkName.READ, "self")
      }
      itemRenderer={renderMembership}
      itemListRenderer={renderOrgUnitList}
      onItemSelect={(membership) => routeToOrgUnit(membership, router)}
      filterable={false}
      scrollToActiveItem={false}
      resetOnQuery={false}
      popoverProps={{
        minimal: true,
        placement: "bottom-start",
        matchTargetWidth: true,
      }}
      popoverTargetProps={{ className: "org-unit-switcher-target" }}
    >
      <Button
        className={"org-unit-switcher"}
        textClassName={"org-unit-switcher__name"}
        icon={<Icon icon={ORG_UNIT_ICON} size={25} />}
        endIcon={<Icon icon={IconNames.CARET_DOWN} size={25} />}
        text={currentOrgUnit?.name ?? "Select org unit"}
        variant="minimal"
        aria-label={"Select org unit"}
      />
    </Select>
  );
};

export default OrgUnitSwitcher;
