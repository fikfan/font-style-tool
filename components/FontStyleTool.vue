<template>
  
  <div class="p-4 max-w-screen-xl m-auto">
    <h1 class="text-2xl font-bold mb-4">font style tool</h1>
    

    <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="mb-4">
        <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">color</label>
        <input
        type="color"
        v-model="textColor"
        class="w-10 h-10 mb-2 overflow-hidden cursor-pointer"
        >
        <Input
          v-model="textColorInput"
          placeholder="#000000 or rgb(0,0,0)"
          @blur="updateColorFromInput"
          class="w-40"
        />
      </div>
    
      <div class="mb-4">
        <label class="block text-lg font-medium text-gray-700 dark:text-gray-300">size</label>
        <div class="flex items-center space-x-2">
          <Slider v-model="fontSizeArray" :min="1" :max="64" class="flex-grow" />
          <Input 
            v-model="fontSizeText"
            type="text"
            class="w-20"
            @blur="applyFontSize"
            @keyup.enter="applyFontSize"
          />
          <span class="text-sm">px</span>
        </div>
      </div>

      <div>
        <label class="block text-lg font-medium text-gray-700">style</label>
        <div class="flex space-x-2 mt-2">
          <Button @click="toggleStyle('bold')" :variant="isBold ? 'default' : 'outline'">bold</Button>
          <Button @click="toggleStyle('italic')" :variant="isItalic ? 'default' : 'outline'">italic</Button>
        </div>
      </div>

      <div>
        <label class="block text-lg font-medium text-gray-700">decoration</label>
        <div class="flex space-x-2 mt-2">
          <Button @click="toggleDecoration('none')" :variant="textDecoration === 'none' ? 'default' : 'outline'">none</Button>
          <Button @click="toggleDecoration('underline')" :variant="textDecoration === 'underline' ? 'default' : 'outline'">underline</Button>
          <Button @click="toggleDecoration('overline')" :variant="textDecoration === 'overline' ? 'default' : 'outline'">overline</Button>
          <Button @click="toggleDecoration('line-through')" :variant="textDecoration === 'line-through' ? 'default' : 'outline'">strikethrough</Button>
        </div>
      </div>

      <div>
        <label class="block text-lg font-medium text-gray-700">transform</label>
        <div class="flex space-x-2 mt-2">
          <Button @click="toggleTransform('none')" :variant="textTransform === 'none' ? 'default' : 'outline'">none</Button>
          <Button @click="toggleTransform('uppercase')" :variant="textTransform === 'UPPERCASE' ? 'default' : 'outline'">UPPERCASE</Button>
          <Button @click="toggleTransform('lowercase')" :variant="textTransform === 'lowercase' ? 'default' : 'outline'">lowercase</Button>
          <Button @click="toggleTransform('capitalize')" :variant="textTransform === 'capitalize' ? 'default' : 'outline'">Capitalized</Button>
        </div>
      </div>
      
      <div>
        <div class="mb-4 w-full">
          <label class="block text-lg font-medium text-gray-700 mb-2">family</label>
          <Select v-model="selectedFont">
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
      
    </div>
    
    <div class="mt-8">
      <h2 class="text-lg font-semibold mb-2">Preview</h2>
      <p :style="previewStyle" class="p-4 border rounded">
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>

    <div class="mt-8">
      <h2 class="text-lg font-semibold mb-2">CSS Code</h2>
      <pre class="p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto"><code>{{ cssCode }}</code></pre>
      <Button
        class="mt-4"
        variant="outline" @click="() => {
          copyToClipboard();
          toast('Copied!', {
            description: 'Thank you for using! -@fikfan',
            action: {
              label: 'Again?',
            },
          })
        }"
      >
        Copy CSS
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const fontSizeText = ref('16')
const fontSizeArray = ref([16])
const isBold = ref(false)
const isItalic = ref(false)
const textDecoration = ref('none')
const textTransform = ref('none')
const popularFonts = [
  'Roboto',
  'Arial',
  'Poppins',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Helvetica',
  'Source Sans Pro',
  'Nunito',
  'Courier New'
]
const textColor = ref('#000000')
const textColorInput = ref('#000000')

const selectedFont = ref('Arial')

//load colors
const updateColorFromInput = () => {
  const input = textColorInput.value.trim().toLowerCase()
  if (input.match(/^#[0-9A-Fa-f]{6}$/)) {
    // Valid hex color
    textColor.value = input
  } else if (input.match(/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/)) {
    // Valid RGB color
    textColor.value = rgbToHex(input)
  } else {
    // Invalid input, revert to current color
    textColorInput.value = textColor.value
  }
}

const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.match(/\d+/g)
  return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`
}

// load fonts
onMounted(() => {
  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css2?family=${popularFonts.join('&family=').replace(/ /g, '+')}&display=swap`
  link.rel = 'stylesheet'
  document.head.appendChild(link)
})

const toggleStyle = (style) => {
  if (style === 'bold') isBold.value = !isBold.value
  if (style === 'italic') isItalic.value = !isItalic.value
}

const toggleDecoration = (decoration) => {
  textDecoration.value = textDecoration.value === decoration ? 'none' : decoration
}

const toggleTransform = (transform) => {
  textTransform.value = textTransform.value === transform ? 'none' : transform
}

const applyFontSize = () => {
  let size = parseInt(fontSizeText.value, 10)
  if (isNaN(size) || size < 1) {
    size = 1
  } else if (size > 200) {
    size = 200
  }
  fontSizeArray.value = [size]
  fontSizeText.value = size.toString()
}

//watch for changes
watch(textColor, (newColor) => {
  textColorInput.value = newColor
})

watch(fontSizeArray, (newValue) => {
  fontSizeText.value = newValue[0].toString()
})

watch(selectedFont, (newFont) => {
  console.log('Selected font changed to:', newFont)
})

const previewStyle = computed(() => ({
  fontSize: `${fontSizeArray.value}px`,
  fontWeight: isBold.value ? 'bold' : 'normal',
  fontStyle: isItalic.value ? 'italic' : 'normal',
  textDecoration: textDecoration.value,
  textTransform: textTransform.value,
  color: textColor.value,
  fontFamily: selectedFont.value
}))

//convert to css
const camelToKebab = (string) => {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

const cssCode = computed(() => {
  return Object.entries(previewStyle.value)
    .map(([key, value]) => {
      const property = camelToKebab(key)
      return `${property}: ${value};`
    })
    .join('\n')
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(cssCode.value)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>