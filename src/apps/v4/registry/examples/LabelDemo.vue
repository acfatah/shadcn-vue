<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <div class="flex items-center gap-3">
      <Checkbox id="label-demo-terms" />
      <Label for="label-demo-terms">Accept terms and conditions</Label>
    </div>

    <div class="grid gap-3">
      <Label for="label-demo-username">Username</Label>
      <Input id="label-demo-username" placeholder="Username" />
    </div>

    <div class="group grid gap-3" :data-disabled="true">
      <Label for="label-demo-disabled">Disabled</Label>
      <Input id="label-demo-disabled" placeholder="Disabled" disabled />
    </div>

    <div class="grid gap-3">
      <Label for="label-demo-message">Message</Label>
      <Textarea id="label-demo-message" placeholder="Message" />
    </div>
  </div>
</template>
