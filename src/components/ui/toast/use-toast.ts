import type { Component, VNode } from 'vue'
import { computed, h, ref, render, Teleport } from 'vue'
import type { ToastProps } from '.'
import Toaster from './Toaster.vue'

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

export type StringOrVNode
  = | string
    | VNode
    | (() => VNode)

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: StringOrVNode
  action?: Component
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE

  return count.toString()
}

type ActionType = typeof actionTypes

type Action
  = | {
    type: ActionType['ADD_TOAST']
    toast: ToasterToast
  }
  | {
    type: ActionType['UPDATE_TOAST']
    toast: Partial<ToasterToast>
  }
  | {
    type: ActionType['DISMISS_TOAST']
    toastId?: ToasterToast['id']
  }
  | {
    type: ActionType['REMOVE_TOAST']
    toastId?: ToasterToast['id']
  }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId))
    return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const state = ref<State>({
  toasts: [],
})

function createToastContainerOnce() {
  let toastContainer = document.getElementById('toaster-container')

  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'toaster-container'
    document.body.appendChild(toastContainer)

    render(
      h(Teleport, { to: 'body' }, [h(Toaster)]),
      toastContainer,
    )
  }
}

function dispatch(action: Action) {
  createToastContainerOnce()

  switch (action.type) {
    case actionTypes.ADD_TOAST:
      state.value.toasts = [action.toast, ...state.value.toasts].slice(0, TOAST_LIMIT)
      break

    case actionTypes.UPDATE_TOAST:
      state.value.toasts = state.value.toasts.map(t =>
        t.id === action.toast.id ? { ...t, ...action.toast } : t,
      )
      break

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      }
      else {
        state.value.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      state.value.toasts = state.value.toasts.map(t =>
        t.id === toastId || toastId === undefined
          ? {
              ...t,
              open: false,
            }
          : t,
      )
      break
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined)
        state.value.toasts = []
      else
        state.value.toasts = state.value.toasts.filter(t => t.id !== action.toastId)

      break
  }
}

function useToast() {
  return {
    toasts: computed(() => state.value.toasts),
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

type ToastOption = Omit<ToasterToast, 'id'>
interface ToastReturn {
  id: string
  dismiss: () => void
  update: (props: ToasterToast) => void
}

function toast(props: ToastOption): ToastReturn
function toast(title: string, description?: string): ToastReturn

function toast(option: ToastOption | string, description?: string) {
  const id = genId()
  const props = typeof option === 'string' ? { title: option, description } : option

  const update = (props: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    })

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open)
          dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

export { toast, useToast }
