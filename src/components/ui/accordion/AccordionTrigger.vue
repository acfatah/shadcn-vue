<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegatedProps"
      :class="cn(
        `
          flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm
          font-medium transition-all outline-none
          hover:underline
          focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
          disabled:pointer-events-none disabled:opacity-50
          [&[data-state=open]>svg]:rotate-180
        `,
        props.class,
      )"
    >
      <slot />
      <slot name="icon">
        <Icon
          icon="lucide-chevron-down"
          :class="cn(
            `
              pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground
              transition-transform duration-200
            `,
          )"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
