<script setup lang="ts">
import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import {
  ContextMenuItemIndicator,
  ContextMenuRadioItem,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ContextMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ContextMenuRadioItemEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuRadioItem
    data-slot="context-menu-radio-item"
    v-bind="forwarded"
    :class="cn(
      `
        relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm
        outline-hidden select-none
        focus:bg-accent focus:text-accent-foreground
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
      `,
      props.class,
    )"
  >
    <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <Icon
          icon="lucide:circle"
          class="
            size-2
            [&>circle]:fill-current
          "
        />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
