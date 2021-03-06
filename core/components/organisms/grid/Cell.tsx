import * as React from 'react';
import classNames from 'classnames';
import { RowData, ColumnSchema } from './Grid';
import { Dropdown, Grid, Placeholder, PlaceholderParagraph, Heading, Icon, Button } from '@/index';
import { resizeCol, getInit } from './utility';
import { GridCell } from './GridCell';
import { DropdownProps } from '@/components/atoms/dropdown';

interface SharedCellProps {
  _this: Grid;
  schema: ColumnSchema;
}

type HeaderCellProps = SharedCellProps & {
  colIndex: number;
  draggable: boolean;
};

type BodyCellProps = SharedCellProps & {
  data: RowData;
  rowIndex: number;
  colIndex: number;
  expandedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};

export type CellProps = (HeaderCellProps | BodyCellProps) & {
  head?: boolean;
  firstCell: boolean;
};

const HeaderCell = (props: HeaderCellProps) => {
  const {
    _this,
    schema,
    draggable,
  } = props;

  const {
    schema: schemaProp,
    loading,
    showMenu,
    sortingList,
    filterList
  } = _this.props;

  const {
    sorting = true,
    name,
    filters,
    pinned
  } = schema;

  const init = getInit(schemaProp);

  const listIndex = sortingList.findIndex(l => l.name === name);
  const sorted = listIndex !== -1 ? sortingList[listIndex].type : null;

  const el = React.createRef<HTMLDivElement>();

  const sortOptions: DropdownProps['options'] = [
    { label: 'Sort Ascending', value: 'sortAsc', icon: 'arrow_downward' },
    { label: 'Sort Descending', value: 'sortDesc', icon: 'arrow_upward' },
  ];
  const pinOptions: DropdownProps['options'] = [
    { label: 'Pin Left', value: 'pinLeft', icon: 'skip_previous' },
    { label: 'Pin Right', value: 'pinRight', icon: 'skip_next' },
  ];
  const unpinOption = { label: 'Unpin', value: 'unpin', icon: 'replay' };
  if (pinned === 'left') pinOptions[0] = unpinOption;
  if (pinned === 'right') pinOptions[1] = unpinOption;

  const hideOptions: DropdownProps['options'] = [
    { label: 'Hide Column', value: 'hide', icon: 'cancel' },
  ];
  const unsortOption = { label: 'Unsort', value: 'unsort', icon: 'unfold_more' };
  if (sorted === 'asc') sortOptions[0] = unsortOption;
  if (sorted === 'desc') sortOptions[1] = unsortOption;

  let options: DropdownProps['options'] = [
    ...pinOptions,
    ...hideOptions
  ];
  if (sorting) options = [...sortOptions, ...options];

  const classes = classNames({
    'Grid-headCell': true,
    'Grid-headCell--draggable': draggable
  });

  const filterOptions = filters
    ? filters.map(f => ({
      ...f,
      selected: filterList[name] && filterList[name].findIndex(fl => fl === f.value) !== -1
    }))
    : [];

  return (
    <div
      key={name}
      className={classes}
      ref={el}
    >
      <div
        className="Grid-cellContent"
        onClick={() => {
          if (!loading && sorting) {
            if (sorted === 'asc') _this.onMenuChange(name, 'sortDesc');
            if (sorted === 'desc') _this.onMenuChange(name, 'unsort');
            if (!sorted) _this.onMenuChange(name, 'sortAsc');
          }
        }}
      >
        {loading && !init ? (
          <Placeholder withImage={false}>
            <PlaceholderParagraph length="medium" />
          </Placeholder>
        ) : (
            <>
              <Heading size="s" className="ellipsis--noWrap">{schema.displayName}</Heading>
              {sorting && (
                <div className="Grid-sortingIcons">
                  {sorted ? sorted === 'asc' ? (
                    <Icon name="arrow_downward" />
                  ) : (
                      <Icon name="arrow_upward" />
                    ) : (
                      <Icon name="unfold_more" />
                    )
                  }
                </div>
              )}
            </>
          )
        }
      </div>
      {filters && (
        <>
          {loading && !init ? (
            <span>
              <Placeholder />
            </span>
          ) : (
              <Dropdown
                menu={true}
                showApplyButton={true}
                withCheckbox={true}
                triggerOptions={{
                  customTrigger: () => (
                    <Button
                      icon="filter_list"
                      appearance="transparent"
                    />
                  )
                }}
                options={filterOptions}
                align={'left'}
                onChange={(selected: any) => _this.onFilterChange(name, selected)}
              />
            )
          }
        </>
      )}
      {showMenu && (
        <>
          {loading && !init ? (
            <span className="ml-4">
              <Placeholder />
            </span>
          ) : (
              <Dropdown
                key={`${name}-${sorted}-${pinned}`}
                menu={true}
                optionType="WITH_ICON"
                triggerOptions={{
                  customTrigger: () => (
                    <Button
                      icon="more_vert_filled"
                      appearance="transparent"
                    />
                  )
                }}
                options={options}
                align={'left'}
                onChange={(selected: any) => _this.onMenuChange(name, selected)}
              />
            )
          }
        </>
      )}
      {schema.resizable && (
        <span
          className="Grid-cellResize"
          onMouseDown={() => {
            resizeCol(_this, name, el.current);
          }}
        />
      )}
    </div>
  );
};

const BodyCell = (props: BodyCellProps) => {
  const {
    _this,
    data,
    schema,
    expandedState,
    rowIndex,
    colIndex
  } = props;

  const {
    size,
    loading,
    nestedRows
  } = _this.props;

  const [expanded, setExpanded] = expandedState;

  return (
    <div className="Grid-cellContent">
      {colIndex === 0 && nestedRows && (
        <Icon
          className="Grid-nestedRowTrigger"
          name={expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          size={20}
          onClick={e => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        />
      )}
      <GridCell
        key={`${rowIndex}-${colIndex}`}
        rowIndex={rowIndex}
        colIndex={colIndex}
        size={size}
        schema={schema}
        data={data}
        loading={loading}
      />
    </div>
  );
};

export const Cell = (props: CellProps) => {
  const {
    _this,
    head,
    colIndex,
    firstCell,
    schema,
    // @ts-ignore
    expandedState,
    // @ts-ignore
    draggable,
    // @ts-ignore
    data,
    // @ts-ignore
    rowIndex,
  } = props;

  const {
    nestedRows
  } = _this.props;

  const cellClass = classNames({
    'Grid-cell': true,
    'Grid-cell--head': head,
    'Grid-cell--body': !head,
    'Grid-cell--separator': !firstCell && schema.separator,
    'Grid-cell--nestedRow': !head && colIndex === 0 && nestedRows
  });

  if (schema.hidden) return null;

  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      className={cellClass}
      draggable={true}
      onDragStart={e => {
        e.dataTransfer.setData('name', schema.name);
        if (schema.pinned) e.dataTransfer.setData('type', schema.pinned);
      }}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        const from = {
          name: e.dataTransfer.getData('name'),
          type: e.dataTransfer.getData('type')
        };
        const to = {
          name: schema.name,
          type: schema.pinned || ''
        };

        if (from.type === to.type) _this.reorderCol(from.name, to.name);
      }}
      style={{
        width: schema.width
      }}
    >
      {head ? (
        <HeaderCell
          _this={_this}
          draggable={draggable}
          colIndex={colIndex}
          schema={schema}
        />
      ) : (
          <BodyCell
            _this={_this}
            rowIndex={rowIndex}
            colIndex={colIndex}
            data={data}
            schema={schema}
            expandedState={expandedState}
          />
        )}
    </div>
  );
};

export default Cell;
