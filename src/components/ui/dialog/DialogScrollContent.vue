<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      data-slot="dialog-overlay"
      :class="cn(
        `
          fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=open]:animate-in data-[state=open]:fade-in-0
        `,
      )"
    >
      <DialogContent
        data-slot="dialog-content"
        :class="cn(
          `
            relative z-50 my-4 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border
            bg-background p-6 shadow-lg duration-200
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=closed]:zoom-out-95
            data-[state=open]:animate-in data-[state=open]:fade-in-0
            sm:rounded-lg
            md:w-full
          `,
          props.class,
        )"
        v-bind="forwarded"
        @pointer-down-outside="(event) => {
          const originalEvent = event.detail.originalEvent;
          const target = originalEvent.target as HTMLElement;

          if (
            originalEvent.offsetX > target.clientWidth
            || originalEvent.offsetY > target.clientHeight
          ) {
            event.preventDefault();
          }
        }"
      >
        <slot />

        <DialogClose
          data-slot="dialog-close"
          :class="cn(
            `
              absolute top-4 right-4 rounded-sm p-0.5 opacity-70 ring-offset-background
              transition-opacity
              hover:opacity-100
              focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden
              disabled:pointer-events-none
              data-[state=open]:bg-accent data-[state=open]:text-muted-foreground
              [&_svg]:pointer-events-none [&_svg]:shrink-0
              [&_svg:not([class*='size-'])]:size-4
            `,
          )"
        >
          <Icon icon="lucide:x" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
