<template>
  
  <div class="p-4 max-w-screen-xl m-auto">
    <h1 class="text-2xl font-bold mb-4">font style tool</h1>
    

    <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ColorPicker v-model:color="textColor"/>
      <FontSizeSelector
        v-model:fontSizeArray="fontSizeArray"
        v-model:fontSizeText="fontSizeText"
      />
      <FontStyleSelector
        v-model:isBold="isBold"
        v-model:isItalic="isItalic"
      />
      <DecorationSelector v-model:textDecoration="textDecoration" />
      <TransformSelector v-model:textTransform="textTransform" />
      <FamilySelector v-model:selectedFont="selectedFont" ref="familySelector" />
    </div>
    
    <PreviewBox :styles="previewStyle"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

//colorpicker component
import ColorPicker from './ColorPicker.vue'
const textColor = ref('#000000')
const textColorInput = ref('#000000')
watch(textColor, (newColor) => {
  textColorInput.value = newColor
})

//fontsize component
import FontSizeSelector from './FontSizeSelector.vue'
const fontSizeText = ref('16')
const fontSizeArray = ref([16])

//fontstyle component
import FontStyleSelector from './FontStyleSelector.vue'
const isBold = ref(false)
const isItalic = ref(false)

//font transform component
import TransformSelector from './TransformSelector.vue'
const textTransform = ref('none')

//font decoration component
import DecorationSelector from './DecorationSelector.vue'
const textDecoration = ref('none')

//font family component
import FamilySelector from './FamilySelector.vue'
const selectedFont = ref('Arial')
const familySelector = ref(null)

onMounted(() => {
  if (familySelector.value) {
    const { popularFonts } = familySelector.value
  }
})

//copy
import PreviewBox from './PreviewBox.vue'

const previewStyle = computed(() => ({
  fontSize: `${fontSizeArray.value[0]}px`,
  fontWeight: isBold.value ? 'bold' : 'normal',
  fontStyle: isItalic.value ? 'italic' : 'normal',
  textDecoration: textDecoration.value,
  textTransform: textTransform.value,
  color: textColor.value,
  fontFamily: selectedFont.value
}))
</script>