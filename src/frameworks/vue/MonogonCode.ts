import { defineComponent, h } from 'vue';
import '../../monogon-code';

export default defineComponent({
  name: 'MonogonCode',
  props: {
    content: { type: String, required: true },
    lang: { type: String as () => 'plaintext' | 'json' | 'css', default: 'plaintext', required: true },
  },
  render() {
    return h('monogon-code', {
      content: this.content,
      lang: this.lang,
    });
  },
});
