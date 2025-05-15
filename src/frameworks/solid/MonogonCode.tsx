import '../../monogon-code.js';

export default function ({
  content,
  lang,
  readonly,
}: {
  content: string;
  lang: string;
  onInput?: () => void;
  readonly?: boolean;
}) {
  // @ts-expect-error JSX not existing
  return <monogon-code attr:content={content} attr:lang={lang} attr:readonly={readonly}></monogon-code>;
}
