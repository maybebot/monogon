# Monogon

Simple and super lightweight syntax highlighting for developers.

Not recommended in production, due to low browser support.

![alt text](image.png)

> [!IMPORTANT]
> This is meant for **developer tooling** and supports _very few_ languages.
>
> If you don't need editable code snippets, look at [Shiki](https://github.com/shikijs/shiki), it's amazing.
>
> If you need editable snippets, [Codemirror](https://github.com/codemirror/dev/) might be worth a look.

## Usage

Import it

```js
import 'monogon';
```

Use in your HTML

```html
<monogon-code lang="json" content='{ "names": ["ian", "camilo"], size: "1kb", status: null  }'>Click me</monogon-code>

<script>
  document.querySelector('monogon-code').addEventListener('input', (event) => {
    console.log(event.target.value);
  });
</script>
```

## Supported languages

| Language  | property  | syntax | formatting |
| --------- | --------- | ------ | ---------- |
| JSON      | json      | ✅     | ✅         |
| CSS       | css       | ❓     | ❌         |
| plaintext | plaintext | -      | -          |

## Frameworks

### Vue

```js
// in <template>
<monogon-code :content="content" @input="handleInput">Click me</monogon-code>

// in <script>
const content = ref('{ "json": ["this", "is", "json"], "how": 42  }')
const handleInput = (e) => {
    content.value = e.target.value
}
```

Vue assumes all [non-native HTML elements are Vue components](https://vuejs.org/guide/extras/web-components#using-custom-elements-in-vue). To resolve this specify in your build config:

```js
plugins: [
  vue({
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: (tag) => tag.includes('-'),
      },
    },
  }),
];
```

### Preact

```jsx
<monogon-code content={jsonText} onInput={(e) => console.log(e.target.value)}></monogon-code>
```

## Theming

Monogon comes with a VScode-like dark and light theme. This theme can be changed by changing the css properties on `monogon-code`.
The simplest way to do so is

```css
monogon-el.custom-theme-name {
  --mng-background: #0f0;
  /* ...other changes, see lit below */
}
@media (prefers-color-scheme: dark) {
  monogon-el.custom-theme-name {
    --mng-background: #040;
    /* ...other changes, see lit below */
  }
}
```

Full list of css properties used:

```css
.default-theme {
  /* Generic */
  --mng-text: #213547;
  --mng-background: #f1f1f1;
  /* Proper highlighting */
  --mng-string: #8b251e;
  --mng-key: #c32b1d;
  --mng-number: #4a845b;
  --mng-boolean: #3716f5;
  --mng-null: #3716f5;
  --mng-comment: #4e862d;
  --mng-curly-brackets: #59913e;
  --mng-square-brackets: #59913e;
  --mng-keyword: #666;
  --mng-dashes: #444;
}
```

## With SSR

SSR is not yet supported, you need to load it in the browser during page load.
