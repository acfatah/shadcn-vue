<script setup lang="ts">
import type { ToastViewportProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToastViewport } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ToastViewportProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToastViewport
    data-slot="toast-viewport"
    v-bind="delegatedProps"
    :class="cn(
      `
        fixed top-0 left-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-y-2 p-4
        sm:top-auto sm:right-0 sm:bottom-0 sm:left-auto sm:max-w-sm sm:flex-col
      `,
      props.class,
    )"
  />
</template>
