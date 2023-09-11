import {
  Blockquote,
  Checkbox,
  Code,
  Divider,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  HTMLTable,
  OL,
  Pre,
  UL,
} from "@blueprintjs/core";
import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

interface ReactMarkdownWrapperProps {
  text: string | null;
  placeHolder?: string;
}

const ReactMarkdownWrapper: FC<ReactMarkdownWrapperProps> = ({
  text,
  placeHolder,
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <H1>{children}</H1>,
        h2: ({ children }) => <H2>{children}</H2>,
        h3: ({ children }) => <H3>{children}</H3>,
        h4: ({ children }) => <H4>{children}</H4>,
        h5: ({ children }) => <H5>{children}</H5>,
        h6: ({ children }) => <H6>{children}</H6>,
        blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
        code: ({ children }) => <Code>{children}</Code>,
        pre: ({ children }) => <Pre>{children}</Pre>,
        ol: ({ children }) => <OL>{children}</OL>,
        ul: ({ children }) => <UL>{children}</UL>,
        hr: () => <Divider />,
        // gfm
        input: ({ checked, disabled }) => (
          <Checkbox
            checked={checked}
            disabled={disabled}
            inline
            style={{ marginRight: "0" }}
          />
        ),
        table: ({ children }) => <HTMLTable striped>{children}</HTMLTable>,
        thead: ({ children }) => <thead>{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
      }}
    >
      {(text || placeHolder) ?? ""}
    </ReactMarkdown>
  );
};

export default ReactMarkdownWrapper;
