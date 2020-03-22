import * as React from 'react';
import Calendar from './Calendar';
import { View, Day, DateType, DateFormat } from './types';
import Popover from '@/components/molecules/popover';
import InputMask from '@/components/molecules/inputMask';
import { getDateInfo, convertToDate } from './utility';
import validators from '@/utils/validators';

export interface IDatePickerProps {
  onDateChange?: (date?: Date) => void;
  jumpView?: boolean;
  date?: DateType;
  firstDayOfWeek?: Day;
  view?: View;
  disabledBefore?: DateType;
  disabledAfter?: DateType;
  yearNav?: number;
  monthNav?: number;
  withInput?: boolean;
  inputFormat?: DateFormat;
  outputFormat?: DateFormat;
}

export const DatePicker: React.FunctionComponent<IDatePickerProps> = props => {
  const {
    date: dateProp,
    withInput = false,
    inputFormat = 'mm/dd/yy',
    outputFormat = 'mm/dd/yy',
    onDateChange,
    ...rest
  } = props;

  const [date, setDate] = React.useState<Date | undefined>(dateProp ? convertToDate(dateProp) : undefined);

  if (withInput) {
    const translateToString = (format: string, d: Date): string => {
      const {
        year,
        month,
        date
      } = getDateInfo(d);

      const separator = format.includes('/') ? '/' : '-';
      const val = format.split(separator).reduce((out, curr) => {
        switch (curr) {
          case 'mm':
            out += (month < 10 && '0') + (month + 1);
            break;
          case 'yy':
            out += year;
            break;
          case 'dd':
            out += (date < 10 && '0') + date;
            break;
        }
        return out;
      }, '');

      return val;
    }

    const translateToDate = (format: string, val: string): Date | undefined => {
      if (validators.date(inputFormat, val)) {
        const separator = format.includes('/') ? '/' : '-';

        let year: number = -1,
          month: number = -1,
          date: number = -1;
        const v = val.split(separator);
        format.split(separator).forEach((f, i) => {
          switch (f) {
            case 'mm':
              month = +v[i] - 1;
              break;
            case 'yy':
              year = +v[i];
              break;
            case 'dd':
              date = +v[i];
              break;
          }
        });
        const d = convertToDate({ year, month, date });
        return d;
      } else {
        return undefined;
      }
    }

    const onChangeHandler = (_e: React.ChangeEvent<HTMLInputElement>, val?: string) => {
      const placeholderChar = '_';
      if (val && !val.includes(placeholderChar)) {
        const d = translateToDate(inputFormat, val);
        if (d) setDate(d);
      }
    }

    const onClearHandler = () => {
      setDate(undefined);
    }

    const onDateChangeHandler = (d?: Date) => {
      if (d) setDate(d);
      if (onDateChange) onDateChange(date)
    }

    const trigger = (
      <InputMask
        name={"datepicker"}
        mask={{ name: 'date', type: inputFormat }}
        validator={{ name: 'date', type: inputFormat }}
        placeholder={inputFormat}
        value={date ? translateToString(inputFormat, date) : ''}
        onChange={onChangeHandler}
        onClear={onClearHandler}
      />
    );

    return (
      <Popover
        trigger={trigger}
        position='bottom-start'
        on='click'
        appendToBody={true}
      >
        <Calendar
          {...rest}
          date={date}
          onDateChange={onDateChangeHandler}
        />
      </Popover>
    );
  } else {
    return (
      <Calendar
        {...rest}
        date={date}
        onDateChange={onDateChange}
      />
    );
  }
};

export default DatePicker;
