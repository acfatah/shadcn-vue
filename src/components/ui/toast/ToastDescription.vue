<script setup lang="ts">
import type { ToastDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToastDescription } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ToastDescriptionProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToastDescription
    data-slot="toast-description"
    :class="cn(
      'text-sm opacity-90',
      props.class,
    )"
    v-bind="delegatedProps"
  >
    <slot />
  </ToastDescription>
</template>
