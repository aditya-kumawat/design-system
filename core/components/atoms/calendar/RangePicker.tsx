import * as React from 'react';
import Calendar from './Calendar';
import { View, Day, DateType, DateFormat } from './types';
import Text from '@/components/atoms/text';
import Popover from '@/components/molecules/popover';
import InputMask from '@/components/molecules/inputMask';
import { getDateInfo, convertToDate } from './utility';
import validators from '@/utils/validators';

export interface IRangePickerProps {
  onRangeChange?: (startDate?: Date, endDate?: Date) => void;
  monthsInView?: number;
  jumpView?: boolean;
  firstDayOfWeek?: Day;
  view?: View;
  disabledBefore?: DateType;
  disabledAfter?: DateType;
  startDate?: DateType;
  endDate?: DateType;
  rangeLimit?: number;
  yearNav?: number;
  monthNav?: number;
  withInput?: boolean;
  inputFormat?: DateFormat;
  outputFormat?: DateFormat;
  rangeSeparator?: string;
}

export const RangePicker: React.FunctionComponent<IRangePickerProps> = props => {
  const {
    startDate: startDateProp,
    endDate: endDateProp,
    withInput = false,
    inputFormat = 'mm/dd/yy',
    outputFormat = 'mm/dd/yy',
    rangeSeparator = ' - ',
    onRangeChange,
    ...rest
  } = props;

  const [startDate, setStartDate] = React.useState<Date | undefined>(startDateProp ? convertToDate(startDateProp) : undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(endDateProp ? convertToDate(endDateProp) : undefined);

  // React.useEffect(() => {
  //   console.log(startDate, endDate);
  // }, [startDate, endDate])

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
        if (d) {
          if (!startDate) setStartDate(d);
          else setEndDate(d);
        }
      }
    }

    const onClearHandler = (type: string) => {
      if (type === 'start') setStartDate(undefined);
      if (type === 'end') setEndDate(undefined);
    }

    const onRangeChangeHandler = (sDate?: Date, eDate?: Date) => {
      if (sDate) setStartDate(sDate);
      if (eDate) setEndDate(eDate);
      if (onRangeChange) {
        onRangeChange(startDate, endDate);
      }
    }

    // const translateToInputValue = (format: string, sDate?: Date, eDate?: Date) => {
    //   let sVal = '',
    //     eVal = '';
    //   if(sDate) sVal = translateToString(format, sDate);
    //   if(eDate) eVal = translateToString(format, eDate);

    //   return sVal + rangeSeparator + eVal;
    // }

    const trigger = (
      <div className='RangePicker-input'>
        <InputMask
          name={"datepicker"}
          mask={{ name: 'date', type: inputFormat }}
          validator={{ name: 'date', type: inputFormat }}
          placeholder={inputFormat}
          value={startDate ? translateToString(inputFormat, startDate) : ''}
          onChange={onChangeHandler}
          onClear={() => onClearHandler('start')}
        />
        <div className="RangePicker-rangeSeparator">
          <Text>{rangeSeparator}</Text>
        </div>
        <InputMask
          name={"datepicker"}
          mask={{ name: 'date', type: inputFormat }}
          validator={{ name: 'date', type: inputFormat }}
          placeholder={inputFormat}
          value={endDate ? translateToString(inputFormat, endDate) : ''}
          onChange={onChangeHandler}
          onClear={() => onClearHandler('end')}
        />
      </div>
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
          rangePicker={true}
          startDate={startDate}
          endDate={endDate}
          onRangeChange={onRangeChangeHandler}
        />
      </Popover>
    );
  } else {
    return (
      <Calendar
        {...rest}
        rangePicker={true}
        startDate={startDate}
        endDate={endDate}
        onRangeChange={onRangeChange}
      />
    );
  }
};

export default RangePicker;
