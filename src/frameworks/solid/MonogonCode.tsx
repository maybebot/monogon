import '../../monogon-code.js';

export default function ({ content, lang }: { content: string; lang: string }) {
  // @ts-expect-error JSX not existing
  return <monogon-code attr:content={content} attr:lang={lang}></monogon-code>;
}
