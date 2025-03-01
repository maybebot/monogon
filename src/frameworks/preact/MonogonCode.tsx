import '../../monogon-code.js';

const MonogonCode = ({ content, lang }: { content: string; lang: string }) => {
  // @ts-expect-error JSX not existing
  return <monogon-code content={content} lang={lang}></monogon-code>;
};

export default MonogonCode;
