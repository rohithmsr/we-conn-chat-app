import React from 'react';
import PropTypes from 'prop-types';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from 'semantic-ui-react';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  atomDark,
  prism,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  jsx,
  java,
  c,
  cpp,
  css,
  json,
  python,
  solidity,
  sql,
} from 'react-syntax-highlighter/dist/esm/languages/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('solidity', solidity);
SyntaxHighlighter.registerLanguage('sql', sql);

const CodeSnippet = ({ text, language, isDark }) => {
  return (
    <div className="code-parent">
      <CopyToClipboard text={text}>
        <span className="copy-button-holder">
          <Icon name="copy outline" />
        </span>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={language}
        style={isDark ? atomDark : prism}
        customStyle={{ paddingRight: 56 }}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

CodeSnippet.propTypes = {
  text: PropTypes.string,
  language: PropTypes.string,
  isDark: PropTypes.bool,
};

CodeSnippet.defaultProps = {
  language: 'markdown',
  isDark: true,
};

export default CodeSnippet;
