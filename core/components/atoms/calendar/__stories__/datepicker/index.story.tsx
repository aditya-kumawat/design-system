import * as React from 'react';
import { boolean, select, date, number } from '@storybook/addon-knobs';
import { DatePicker } from '@/components/atoms/calendar';
import Card from '@/components/atoms/card';
import { action } from '@storybook/addon-actions';

// CSF format story
export const all = () => {
  const withInput = boolean(
    'withInput',
    false
  );

  const dateValue = date(
    'date',
    undefined
  );

  const view = select(
    'view',
    ['date', 'month', 'year'],
    undefined
  );

  const firstDayOfWeek = select(
    'firstDayOfWeek',
    ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    undefined
  );

  const disabledBefore = date(
    'disabledBefore',
    new Date('Jan 20 2015')
  );

  const disabledAfter = date(
    'disabledAfter',
    new Date('Jan 20 2028')
  );

  const jumpView = boolean(
    'jumpView',
    true
  );

  const yearNav = number(
    'yearNav',
    -1
  );

  const monthNav = number(
    'monthNav',
    -1
  );

  const attr: Record<string, any> = {};
  if (disabledBefore) attr.disabledBefore = disabledBefore;
  if (disabledAfter) attr.disabledAfter = disabledAfter;
  if (yearNav !== -1) attr.yearNav = yearNav;
  if (monthNav !== -1) attr.monthNav = monthNav;

  if (withInput) {
    return (
      <DatePicker
        withInput={withInput}
        jumpView={jumpView}
        date={dateValue}
        onDateChange={(currDate?: Date) => action(`on date change : ${currDate}`)()}
        view={view}
        firstDayOfWeek={firstDayOfWeek}
        {...attr}
      />
    )
  } else {
    return (
      <Card
        shadow="light"
        style={{
          maxWidth: '330px'
        }}
      >
        <DatePicker
          withInput={withInput}
          jumpView={jumpView}
          date={dateValue}
          onDateChange={(currDate?: Date) => action(`on date change : ${currDate}`)()}
          view={view}
          firstDayOfWeek={firstDayOfWeek}
          {...attr}
        />
      </Card>
    );
  }
};

// Required for CSF format story
// https://medium.com/storybookjs/component-story-format-66f4c32366df
export default { title: 'Calendar/Datepicker' };
