<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import {
  TooltipProvider,
  TooltipRoot,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipProvider>
    <TooltipRoot
      data-slot="tooltip"
      v-bind="forwarded"
    >
      <slot />
    </TooltipRoot>
  </TooltipProvider>
</template>
