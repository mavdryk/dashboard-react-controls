/*
Copyright 2022 Iguazio Systems Ltd.
Licensed under the Apache License, Version 2.0 (the "License") with
an addition restriction as set forth herein. You may not use this
file except in compliance with the License. You may obtain a copy of
the License at http://www.apache.org/licenses/LICENSE-2.0.
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.
In addition, you may not use the software for any purposes that are
illegal under applicable law, and the grant of the foregoing license
under the Apache 2.0 license is conditioned upon your compliance with
such restriction.
*/
import React from 'react'
import { Form } from 'react-final-form'

import { FormSelect } from '/src/lib/components'

export default {
  title: 'Example/FormSelect',
  component: FormSelect
}

const commonArgs = {
  label: 'label',
  name: 'select',
  options: [
    { id: 'min', label: 'long-long-long-long-long-long-long-long' },
    { id: 'max', label: 'Max' }
  ]
}

const Template = args => <Form onSubmit={() => null}>{() => <FormSelect {...args} />}</Form>

export const Dense = Template.bind({})
Dense.args = {
  ...commonArgs,
  density: 'dense'
}

export const Normal = Template.bind({})
Normal.args = {
  ...commonArgs,
  density: 'normal'
}

export const Medium = Template.bind({})
Medium.args = {
  ...commonArgs,
  density: 'medium'
}

export const Chunky = Template.bind({})
Chunky.args = {
  ...commonArgs,
  density: 'chunky'
}
