<template>
  <div class="mb-4">
    <label class="block text-lg font-medium text-black dark:text-white">color</label>
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
