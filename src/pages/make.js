import React from 'react'
import TextField from '../components/text-field'
import ListForm from '../components/list-form'
import ListFormList from '../components/list-form-list'
import Button from '../components/button'

export default {
  view(state, prev, actions) {
    return (
      <div className='pos-fixed top0 left0 h100 w100 bgNearWhite pa5 overflow-auto'>
        <div className='mw-1000 center'>
          <div className='tr pb5'>
            <Button onClick={actions.startShow}>Play</Button>
          </div>
          <TextField
            label={`Road to 51% - set to 0 if you don't want it to play :-)`}
            id='road-to-51'
            value={state.roadTo51}
            onChange={actions.setRoadTo51}
            className='mb3'
          />
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
                  className='mb3'
                />
                <TextField
                  label='Target'
                  id='target'
                  type='number'
                  value={state.form.fields.target}
                  errors={state.form.errors.target}
                  onChange={val => actions.form.setFields({ target: val })}
                  className='mb3'
                />
                <TextField
                  label='Actual'
                  id='actual'
                  type='number'
                  value={state.form.fields.actual}
                  errors={state.form.errors.actual}
                  onChange={val => actions.form.setFields({ actual: val })}
                  className='mb3'
                />
                <TextField
                  label='Prefix (i.e. £)'
                  id='prefix'
                  value={state.form.fields.prefix}
                  errors={state.form.errors.prefix}
                  onChange={val => actions.form.setFields({ prefix: val })}
                  className='mb3'
                />
                <TextField
                  label='Suffix (i.e. %)'
                  id='suffix'
                  value={state.form.fields.suffix}
                  errors={state.form.errors.suffix}
                  onChange={val => actions.form.setFields({ suffix: val })}
                  className='mb3'
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
                    <div className='tc'>
                      <p className='fsLarge fwBold lhTitle mb2'>
                        {item.metric}
                      </p>
                      <div className='d-inline-flex items-center'>
                        <div className='d-ib mr3'>
                          <p className='tt-uppercase fsSmall fwMedium fLightGray mb1'>Target</p>
                          <span className='fwMedium fsLarge'>{item.target}</span>
                        </div>
                        <i className="material-icons fLighterGray">arrow_forward</i>
                        <div className='d-ib ml3'>
                          <p className='tt-uppercase fsSmall fwMedium fLightGray mb1'>Actual</p>
                          <span className='fwMedium fsLarge'>{item.actual}</span>
                        </div>
                      </div>
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
        </div>
      </div>
    )
  }
}
