import React from 'react';
import { UUI } from '../../core/uui';
import { Button as UUIButton } from '../Button/Button';
import classNames from 'classnames';

export enum SwitchNodeName {
  Root = "switch",
  Checkbox = "checkbox",
  Inner = "inner",
}

export type SwitchSize = 'small' | 'default';

export interface BaseSwitchProps {
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the control is loading.
   * @default false
   */
  loading?: boolean;
  value: boolean;
  onChange: (flag: boolean) => void;
}

export const Switch = UUI.FunctionComponent({
  name: 'Switch',
  nodes: {
    Root: 'div',
    Button: UUIButton,
    Thumb: 'div',
    Loading: 'div',
  }
}, (props: BaseSwitchProps, nodes) => {
  const { Root, Button, Thumb, Loading } = nodes

  return (
    <Root
      className={classNames({
        'checked': props.value,
        'disabled': props.disabled,
        'loading': props.loading,
      })}
    >
      <Button onClick={() => { !props.disabled && props.onChange(!props.value) }}>
        <Thumb>
          <Loading></Loading>
        </Thumb>
      </Button>
    </Root>
  )
})

export type SwitchProps = Parameters<typeof Switch>[0]
