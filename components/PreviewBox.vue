<template>
  <div>
    <div class="mt-8">
      <h2 class="text-lg font-semibold mb-2">Preview</h2>
      <p :style="styles" class="p-4 border rounded">
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>

    <div class="mt-8">
      <h2 class="text-lg font-semibold mb-2">CSS Code</h2>
      <pre class="p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto"><code>{{ cssCode }}</code></pre>
      <Button
        class="mt-4"
        @click="copyCss"
      >
        Copy CSS
      </Button>
    </div>
  </div>
  
</template>

<script setup>
import { toast } from 'vue-sonner'
const props = defineProps({
  styles: { 
    type: Object,
    required: true,
  }
})

const camelToKebab = (string) => {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

const cssCode = computed(() => {
  return Object.entries(props.styles)
    .map(([key, value]) => {
      const property = camelToKebab(key)
      return `${property}: ${value};`
    })
    .join('\n')
})

const copyCss = async () => {
  try {
    await navigator.clipboard.writeText(cssCode.value);
    toast('Copied!', {
    description: 'Thank you for using! -@fikfan',
    action: {
      label: 'Again?',
    },
  })
  } catch (err) {
    console.error('Failed to copy: ', err);
    toast('Copy failed', {
      description: 'Whoops, that\'s not supposed to happen',
      action: {
        label: 'Send me a PR plz on the repo thanks!'
      },
    })
  }
}


</script>