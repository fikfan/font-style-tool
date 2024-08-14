<template>
  <div class="mb-4">
    <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">size</label>
    <div class="flex items-center space-x-2">
      <Slider
        v-model="localFontSizeArray"
        :min="1"
        :max="64"
        class="flex-grow"
      />
      <Input 
        v-model="localFontSizeText"
        type="text"
        class="w-20"
        @blur="applyFontSize"
        @keyup.enter="applyFontSize"
      />
      <span class="text-sm">px</span>
    </div>
  </div>
</template>

<script setup>
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

const props = defineProps({
  fontSizeArray: {
    type: Array,
    required: true
  },
  fontSizeText: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:fontSizeArray', 'update:fontSizeText'])

const localFontSizeArray = ref(props.fontSizeArray)
const localFontSizeText = ref(props.fontSizeText)

watch(() => props.fontSizeArray, (newVal) => {
  localFontSizeArray.value = newVal
})

watch(() => props.fontSizeText, (newVal) => {
  localFontSizeText.value = newVal
})

watch(localFontSizeArray, (newVal) => {
  emit('update:fontSizeArray', newVal)
  emit('update:fontSizeText', newVal[0].toString())
})

watch(localFontSizeText, (newVal) => {
  emit('update:fontSizeText', newVal)
})

const applyFontSize = () => {
  let size = parseInt(localFontSizeText.value, 10)
  if (isNaN(size) || size < 1) {
    size = 1
  } else if (size > 64) {
    size = 64
  }
  localFontSizeArray.value = [size]
  localFontSizeText.value = size.toString()
}
</script>