<template>
  <div>
    <div class="mb-4 w-full">
      <label class="block text-lg font-medium text-black dark:text-white mb-2">family</label>
      <Select v-model="selectedFontLocal">
        <SelectTrigger>
          <SelectValue :placeholder="selectedFont || 'select a font'" />
        </SelectTrigger>
        <SelectContent >
          
          <!-- <SelectLabel>fonts</SelectLabel> -->
          <SelectItem v-for="font in popularFonts" :key="font" :value="font">
            <span :style="{ fontFamily: font }">{{ font }}</span>
          </SelectItem>
          
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<script setup>

const popularFonts = [
  'Arial',
  'Courier New'
]

const props = defineProps({
  selectedFont: {
    type: String,
    default: 'Arial',
  }
})

const emit = defineEmits(['update:selectedFont'])

const selectedFontLocal = ref(props.selectedFont)

watch(selectedFontLocal, (newFont) => {
  emit('update:selectedFont', newFont)
})

watch(() => props.selectedFont, (newFont) => {
  selectedFontLocal.value = newFont
})

// load fonts
onMounted(() => {
  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css2?family=${popularFonts.join('&family=').replace(/ /g, '+')}&display=swap`
  link.rel = 'stylesheet'
  document.head.appendChild(link)
})

</script>