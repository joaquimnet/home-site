import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';

const renderers = {
  code: function Highlight({ language, value }) {
    if (!value || value.length === 0) {
      return <span>{value}</span>;
    }

    return (
      <SyntaxHighlighter
        showLineNumbers={true}
        style={nord}
        language={language}
        // eslint-disable-next-line react/no-children-prop
        children={value}
      />
    );
  },
};

const StyledMarkdown = styled(ReactMarkdown)`
  width: 100%;
  align-self: flex-start;
  color: white;

  & p {
    margin-bottom: 1rem;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0;
  }
`;

const Markdown = (props) => {
  return <StyledMarkdown plugins={[gfm]} renderers={renderers} {...props} />;
};

export default Markdown;
