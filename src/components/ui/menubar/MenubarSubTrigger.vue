<script setup lang="ts">
import type { MenubarSubTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { MenubarSubTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<MenubarSubTriggerProps & {
  class?: HTMLAttributes['class']
  inset?: boolean
}>()

const delegatedProps = reactiveOmit(props, 'class', 'inset')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <MenubarSubTrigger
    data-slot="menubar-sub-trigger"
    :data-inset="inset ? '' : undefined"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none
        focus:bg-accent focus:text-accent-foreground
        data-[inset]:pl-8
        data-[state=open]:bg-accent data-[state=open]:text-accent-foreground
      `,
      props.class,
    )"
  >
    <slot />
    <Icon icon="lucide:chevron-right" class="ml-auto" />
  </MenubarSubTrigger>
</template>
