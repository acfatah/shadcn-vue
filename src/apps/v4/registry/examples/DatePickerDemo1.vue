<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { Icon } from '@iconify/vue'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()
</script>

<template>
  <Popover v-slot="{ open }">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          `
            w-full justify-between text-left font-normal
            md:w-[280px]
          `,
          open && '[&[data-state=open]>svg]:rotate-180',
          !value && 'text-muted-foreground',
        )"
      >
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Select date' }}
        <Icon icon="lucide:chevron-down" class="opacity-50 transition-transform duration-200" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
