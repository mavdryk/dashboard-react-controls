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
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

import PopUpDialog from '../../components/PopUpDialog/PopUpDialog'

import './optionsMenu.scss'

const OptionsMenu = React.forwardRef(({ children = [], show = false, timeout = 300 }, ref) => {
  const { width: dropdownWidth } = ref.current ? ref.current.getBoundingClientRect() : {}
  return (
    <CSSTransition in={show} timeout={timeout} classNames="options-menu-transition" unmountOnExit>
      <PopUpDialog
        headerIsHidden
        className="options-menu"
        customPosition={{
          element: ref,
          position: 'bottom-right',
          autoVerticalPosition: true,
          autoHorizontalPosition: true
        }}
        style={{ minWidth: `${dropdownWidth}px` }}
      >
        <ul className="options-menu__body">{children}</ul>
      </PopUpDialog>
    </CSSTransition>
  )
})

OptionsMenu.displayName = 'OptionsMenu'

OptionsMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  show: PropTypes.bool.isRequired,
  timeout: PropTypes.number
}

export default OptionsMenu
