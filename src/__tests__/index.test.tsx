import React from "react";
import { render, screen } from "@testing-library/react";
import { LinkName } from "../features/links/types/LinkModel";
import OrgUnitDashboard from "../features/orgUnits/components/OrgUnitDashboard";
import OrgUnitModel from "../features/orgUnits/models/OrgUnitModel";
import { OrgUnitContext } from "../features/orgUnits/OrgUnitContext";
import { UserType } from "../features/users/models/UserType";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const orgUnit: OrgUnitModel = {
  name: "parts picker",
  shortDescription: null,
  owner: { username: "owner", displayName: null, type: UserType.HUMAN },
  createdBy: { username: "owner", displayName: null, type: UserType.HUMAN },
  createdOn: "2026-09-13T00:00:00Z",
  _links: {
    self: {
      href: "http://backend/org-units/1",
      name: LinkName.READ,
      templated: false,
    },
  },
};

describe("OrgUnitDashboard", () => {
  it("renders the org unit as heading", () => {
    render(
      <OrgUnitContext.Provider value={{ orgUnit, orgUnitPath: "/org-units/x" }}>
        <OrgUnitDashboard />
      </OrgUnitContext.Provider>
    );

    expect(
      screen.getByRole("heading", { name: /parts picker/i })
    ).toBeInTheDocument();
  });
});
