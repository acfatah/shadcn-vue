<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Payment } from '../data/payments'

const props = defineProps<{
  payment: Payment
}>()

function copy(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 self-end p-0">
        <span class="sr-only">Open menu</span>
        <Icon icon="lucide:ellipsis" class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(props.payment.id)">
        Copy payment ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View customer</DropdownMenuItem>
      <DropdownMenuItem>View payment details</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
