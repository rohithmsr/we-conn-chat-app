import CodeSnippet from './CodeSnippet';

const CodeMessage = ({ message }) => {
  const textArray = message.split('$');
  const filename = textArray[1].replace('<code></code>', '');
  const codeLanguage = textArray[2].trim();

  let codeString = decodeURIComponent(textArray[3]);
  codeString = codeString.substring(0, codeString.lastIndexOf('</pre>'));
  codeString = codeString.replace('<pre>', '').replace('</pre>', '');

  return (
    <div className="code-wrapper">
      {`${filename}.${codeLanguage}`}
      <CodeSnippet
        text={codeString}
        language={codeLanguage}
        isDark={true}
      ></CodeSnippet>
    </div>
  );
};

export default CodeMessage;
