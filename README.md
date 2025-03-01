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
<monogon-code lang="json" content="{ "names": ["ian", "camilo"], size: "1kb", status: null  }">Click me</monogon-code>

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

```js
<monogon-code content={jsonText} onInput={(e) => console.log(e.target.value)}></monogon-code>
```

### With SSR

SSR is not yet supported, you need to load it in the browser during page load.
