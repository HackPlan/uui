import React from 'react';
import { DateFormatterLocale, DateFormatterLocaleKinds, dateFormat } from '../../utils/dateFormatter';
import { UUI } from '../../utils/uui';

export interface DateLabelProps<T extends DateFormatterLocale> extends React.HTMLAttributes<HTMLOrSVGElement> {
  value: Date
  locale: T
  kind: DateFormatterLocaleKinds[T][number]
}

export const DateLabel = UUI.FunctionComponent({
  name: 'DateLabel',
  nodes: {
    Root: 'label',
  }
}, (props: DateLabelProps<DateFormatterLocale>, nodes) => {
  const { Root } = nodes

  const text = dateFormat(props.value, props.locale, props.kind)
  return (
    <Root>{text}</Root>
  )
})