<template>
  <div>
    <label class="block text-lg font-medium text-gray-700">style</label>
    <div class="flex space-x-2 mt-2">
      <Button @click="toggleStyle('bold')" :variant="isBold ? 'default' : 'outline'">bold</Button>
      <Button @click="toggleStyle('italic')" :variant="isItalic ? 'default' : 'outline'">italic</Button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  isBold: Boolean,
  isItalic: Boolean
})

const emit = defineEmits(['update:isBold', 'update:isItalic'])

const toggleStyle = (style) => {
  if (style === 'bold') {
    emit('update:isBold', !props.isBold)
  } else if (style === 'italic') {
    emit('update:isItalic', !props.isItalic)
  }
}
</script>
