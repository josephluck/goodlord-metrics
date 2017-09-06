import React from 'react'
import TextField from '../components/text-field'
import ListForm from '../components/list-form'
import ListFormList from '../components/list-form-list'

export default {
  view(state, prev, actions) {
    return (
      <div>
        <ListForm
          saveText='Save'
          saveChangesText='Save Changes'
          addText='Add'
          addAnotherText='Add Another'
          formVisible={state.form.formVisible}
          currentlyEditing={state.form.currentlyEditingIndex}
          numberOfItems={state.form.items.length}
          form={(
            <div>
              <TextField
                label='Metric'
                id='metric'
                value={state.form.fields.metric}
                errors={state.form.errors.metric}
                onChange={val => actions.form.setFields({ metric: val })}
              />
              <TextField
                label='Target'
                id='target'
                type='number'
                value={state.form.fields.target}
                errors={state.form.errors.target}
                onChange={val => actions.form.setFields({ target: val })}
              />
              <TextField
                label='Actual'
                id='actual'
                type='number'
                value={state.form.fields.actual}
                errors={state.form.errors.actual}
                onChange={val => actions.form.setFields({ actual: val })}
              />
            </div>
          )}
          list={(
            <ListFormList
              editText='Edit'
              deleteText='Delete'
              className=''
              items={state.form.items}
              item={(item) => {
                return (
                  <div>
                    {item.metric}
                  </div>
                )
              }}
              currentlyEditing={state.form.currentlyEditingIndex}
              onEdit={index => actions.form.beginEditingItem({ index })}
              onRemove={index => actions.form.removeItem({ index })}
              id='metric-list-item'
            />
          )}
          onSave={actions.form.submitForm}
          onDiscardEdit={actions.form.discardEditingItem}
          onToggleVisibility={visible => actions.form.setFormVisibility({ visible })}
          autoShowForm={true}
        />
        <a onClick={actions.startShow}>Play</a>
      </div>
    )
  }
}
