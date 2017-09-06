import * as identity from 'lodash/fp/identity'
import * as Form from './form'
import replace from '../utils/replace-array-element'

export function model({
  constraints,
  defaultForm,
  sanitize = identity,
  deSanitize = identity,
}) {
  const form = Form.model({ constraints, defaultForm })
  const defaultState = () => {
    return {
      ...form.state,
      formVisible: false,
      items: [],
      currentlyEditingIndex: null,
    }
  }
  return {
    scoped: true,
    state: defaultState(),
    reducers: {
      ...form.reducers,
      resetState: defaultState,
      setItems(_state, items) {
        return { items }
      },
      addItem(state, { item }) {
        return {
          items: state.items.concat(item),
        }
      },
      updateItem(state, { index, item }) {
        return {
          items: replace(state.items, item, index),
        }
      },
      removeItem(state, { index }) {
        const fields = defaultForm()
        const formConstraints = constraints(fields)
        return {
          items: state.items.filter((_item, i) => i !== index),
          currentlyEditingIndex: null,
          fields: fields,
          errors: Form.makeDefaultErrors(formConstraints),
        }
      },
      setFormVisibility(_state, { visible }) {
        return {
          formVisible: visible,
        }
      },
      setEditingItem(_state, { index }) {
        return {
          currentlyEditingIndex: index,
        }
      },
    },
    effects: {
      ...form.effects,
      submitForm(state, send) {
        return send.validateOnSubmit().fold(
          () => Promise.resolve(state),
          () => {
            if (state.currentlyEditingIndex !== null) {
              send.updateItem({
                index: state.currentlyEditingIndex,
                item: sanitize(state.fields),
              })
            } else {
              send.addItem({
                item: sanitize(state.fields),
              })
            }
            send.setFormVisibility({ visible: false })
            send.setEditingItem({ index: null })
            const last = send.resetForm()
            return Promise.resolve(last)
          })
      },
      beginEditingItem(state, send, { index }) {
        send.setEditingItem({ index })
        send.setFields(deSanitize(state.items[index]))
        const last = send.setFormVisibility({ visible: true })
        return Promise.resolve(last)
      },
      discardEditingItem(_state, send) {
        send.setFormVisibility({ visible: false })
        send.resetForm()
        const last = send.setEditingItem({ index: null })
        return Promise.resolve(last)
      },
    },
  }
}
