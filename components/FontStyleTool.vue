<template>
  
  <div class="p-4 max-w-screen-xl m-auto">
    <h1 class="text-2xl font-bold mb-4">Font Style Tool</h1>
    
    <div class="grid grid-cols-2 gap-4">
      <div> 
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Font Size</label>
          <Slider v-model="fontSizeArray" :min="8" :max="72" class="w-full" />
          <Input v-model="fontSizeArray" type="number" class="mt-2" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Font Style</label>
          <div class="flex space-x-2">
            <Button @click="toggleStyle('bold')" :variant="isBold ? 'default' : 'outline'">Bold</Button>
            <Button @click="toggleStyle('italic')" :variant="isItalic ? 'default' : 'outline'">Italic</Button>
            <Button @click="toggleStyle('underline')" :variant="isUnderline ? 'default' : 'outline'">Underline</Button>
          </div>
        </div>
      
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Font Family</label>
          <Select v-model="selectedFont">
            <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
          </Select>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-lg font-semibold mb-2">Preview</h2>
        <p :style="previewStyle" class="p-4 border rounded">
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const fontSize = ref(16)
const fontSizeArray = ref([16])
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)
const selectedFont = ref('Arial')

const fonts = [
  'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 
  'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 
  'Trebuchet MS', 'Arial Black', 'Impact'
]

const toggleStyle = (style) => {
  if (style === 'bold') isBold.value = !isBold.value
  if (style === 'italic') isItalic.value = !isItalic.value
  if (style === 'underline') isUnderline.value = !isUnderline.value
}

const previewStyle = computed(() => ({
  fontSize: `${fontSizeArray.value}px`,
  fontWeight: isBold.value ? 'bold' : 'normal',
  fontStyle: isItalic.value ? 'italic' : 'normal',
  textDecoration: isUnderline.value ? 'underline' : 'none',
  fontFamily: selectedFont.value
}))
</script>