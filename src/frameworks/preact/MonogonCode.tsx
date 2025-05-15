import '../../monogon-code.js';

const MonogonCode = ({
  content,
  lang,
  readonly,
}: {
  content: string;
  lang: string;
  onInput?: () => void;
  readonly: boolean;
}) => {
  // @ts-expect-error JSX not existing
  return <monogon-code content={content} lang={lang} readonly={readonly}></monogon-code>;
};

export default MonogonCode;
