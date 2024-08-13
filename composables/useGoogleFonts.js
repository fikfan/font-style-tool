// composables/useGoogleFonts.js
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'

export function useGoogleFonts() {
  const fonts = ref([])
  const isLoading = ref(true)
  const config = useRuntimeConfig()

  onMounted(async () => {
    console.log('Mounting script')
    try {
      const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${config.public.googleFontsApiKey}`)
      const data = await response.json();
      
      fonts.value = data.items.map(font => font.family)
      console.log('Fetched')
    } catch (error) {
      console.error('Error loading Google Fonts:', error)
    } finally {
      isLoading.value = false
    }
  })

  return { fonts, isLoading }
}