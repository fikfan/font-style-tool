<template>
  <div>
    <label class="block text-lg font-medium text-gray-700">decoration</label>
    <div class="flex space-x-2 mt-2">
      <Button @click="toggleDecoration('none')" :variant="textDecoration === 'none' ? 'default' : 'outline'">none</Button>
      <Button @click="toggleDecoration('underline')" :variant="textDecoration === 'underline' ? 'default' : 'outline'">underline</Button>
      <Button @click="toggleDecoration('overline')" :variant="textDecoration === 'overline' ? 'default' : 'outline'">overline</Button>
      <Button @click="toggleDecoration('line-through')" :variant="textDecoration === 'line-through' ? 'default' : 'outline'">strikethrough</Button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  textDecoration: {
    type: String,
    default: 'none'
  }
})

const emit = defineEmits(['update:textDecoration']);

const toggleDecoration = (decoration) => {
  emit('update:textDecoration', props.textDecoration === decoration ? 'none' : decoration)
}

</script>