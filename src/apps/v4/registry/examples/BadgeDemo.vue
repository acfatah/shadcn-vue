<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="flex w-full flex-wrap gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">
        Secondary
      </Badge>
      <Badge variant="destructive">
        Destructive
      </Badge>
      <Badge variant="outline">
        Outline
      </Badge>
    </div>
    <div class="flex w-full flex-wrap gap-2">
      <Badge
        variant="secondary"
        class="
          bg-blue-500 text-white
          dark:bg-blue-600
        "
      >
        <Icon icon="lucide:check" />
        Verified
      </Badge>
      <Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
        8
      </Badge>
      <Badge
        class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
        variant="destructive"
      >
        99
      </Badge>
      <Badge
        class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
        variant="outline"
      >
        20+
      </Badge>
    </div>
  </div>
</template>
