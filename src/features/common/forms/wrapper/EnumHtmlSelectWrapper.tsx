import { Intent } from "@blueprintjs/core";
import { FC } from "react";
import HtmlSelectWrapper from "./HtmlSelectWrapper";

interface EnumHtmlSelectWrapperProps {
  name: string;
  valueEnum: Record<string, string>;
  defaultValue?: string;
  label?: string;
  formGroupProps?: { [key: string]: unknown };
  intent?: Intent;
  disabled?: boolean;
  [key: string]: unknown;
}

const EnumHtmlSelectWrapper: FC<EnumHtmlSelectWrapperProps> = ({
  valueEnum,
  ...reducedProps
}) => <HtmlSelectWrapper {...reducedProps} values={Object.values(valueEnum)} />;

export default EnumHtmlSelectWrapper;
