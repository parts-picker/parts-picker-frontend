import { cookies } from "next/headers";
import { readSessionAccessToken } from "@/features/common/security/readSessionAccessToken";
import { redirect } from "next/navigation";
import {
  ORG_UNIT_COOKIE_NAME,
  ORG_UNITS_PATH,
} from "@/features/orgUnits/OrgUnitConstants";
import { resolveDefaultOrgUnitPath } from "@/features/orgUnits/server/resolveDefaultOrgUnitPath";

export const dynamic = "force-dynamic";

// the root redirects to the users last used org unit or their first as a fallback
const Home = async () => {
  const cookieStore = await cookies();
  const accessToken = await readSessionAccessToken();
  if (!accessToken) {
    redirect(ORG_UNITS_PATH);
  }

  redirect(
    await resolveDefaultOrgUnitPath(
      accessToken,
      cookieStore.get(ORG_UNIT_COOKIE_NAME)?.value
    )
  );
};

export default Home;
