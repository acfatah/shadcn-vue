<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { TooltipArrow } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & {
  class?: HTMLAttributes['class']
}>(), {
  sideOffset: 4,
})

const emits = defineEmits<TooltipContentEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(
        `
          z-50 w-fit animate-in rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground
          fade-in-0 zoom-in-95
          data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95
          md:max-w-full md:text-balance
        `,
        // screen width minus scrollbar width
        'max-w-[calc(100dvw-15px)]',
        props.class,
      )"
    >
      <slot />

      <TooltipArrow />
    </TooltipContent>
  </TooltipPortal>
</template>
