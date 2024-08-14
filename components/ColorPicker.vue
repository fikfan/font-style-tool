<template>
  <div class="mb-4">
    <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">color</label>
    <input
    type="color"
    :value="color"
    @input="updateColor"
    class="w-10 h-10 border border-black rounded-sm mb-2 overflow-hidden cursor-pointer"
    title="Click to choose a color"
    readonly
    >
  </div>

</template>

<script setup>
import { Input } from '@/components/ui/input'

const props = defineProps({
  color: {
    type: String,
    default: '#000000'
  }
})

const colorInput = ref(props.color)

const emit = defineEmits(['update:color'])

const updateColor = (event) => {
  const newColor = event.target.value
  colorInput.value = newColor
  emit('update:color', newColor)
}

watch(() => props.color, (newColor) => {
  colorInput.value = newColor
})
</script>
