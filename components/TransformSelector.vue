<template>
  <div>
    <label class="block text-lg font-medium text-black dark:text-white">transform</label>
    <div class="flex space-x-2 mt-2">
      <Button @click="toggleTransform('none')" :variant="textTransform === 'none' ? 'default' : 'outline'">none</Button>
      <Button @click="toggleTransform('uppercase')" :variant="textTransform === 'uppercase' ? 'default' : 'outline'">UPPERCASE</Button>
      <Button @click="toggleTransform('lowercase')" :variant="textTransform === 'lowercase' ? 'default' : 'outline'">lowercase</Button>
      <Button @click="toggleTransform('capitalize')" :variant="textTransform === 'capitalize' ? 'default' : 'outline'">Capitalized</Button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  textTransform: {
    type: String,
    default: 'none'
  }
})

const emit = defineEmits(['update:textTransform'])


const toggleTransform = (transform) => {
  emit('update:textTransform', props.textTransform === transform ? 'none' : transform)
}

</script>