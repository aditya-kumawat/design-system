import * as React from 'react';
import Input, { IInputProps } from '@/components/atoms/input';
// import validators from '@/utils/validators';
import masks from './masks';

export type Validator = {
  name: string,
  type: string
};
export interface IInputMaskProps extends IInputProps {
  mask: Validator | (string | RegExp)[];
  placeholderChar?: string;
  validator?: Validator | ((val: string) => boolean);
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, val?: string) => void;
  onClear?: (e: React.MouseEvent<HTMLElement>) => void;
}

const InputMask = React.forwardRef<HTMLInputElement, IInputMaskProps>((props, forwardRef) => {
  const {
    mask: maskProp,
    value: valueProp,
    error: errorProp,
    placeholderChar = '_',
    onChange,
    onBlur,
    onClick,
    onClear,
    validator,
    caption,
    ...rest
  } = props;

  const mask = Array.isArray(maskProp) ? maskProp : masks[maskProp.name][maskProp.type];

  const [value, setValue] = React.useState<string>('');
  const [caret, setCaret] = React.useState<number>(0);
  const [error, setError] = React.useState<boolean>(errorProp || false);
  const ref = React.useRef<HTMLInputElement>(null);

  const fixedMask = mask.filter(m => typeof m === 'string' && m.length === 1);

  React.useEffect(() => {
    if (valueProp) {
      setValue(convertToMasked(valueProp));
    }
  }, [valueProp]);

  React.useEffect(() => {
    setCaretPos(caret);
  }, [caret]);

  React.useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      el.addEventListener('keyup', (e) => {
        if (e.keyCode === 37 || e.keyCode === 39) {
          if (ref.current) {
            const pos = ref.current.selectionEnd;
            if (ref.current.selectionStart === ref.current.selectionEnd) {
              if (pos) setCaret(pos);
            }
          }
        }
      })
    }
  }, [ref]);

  React.useImperativeHandle(forwardRef, () => ref.current as HTMLInputElement);

  const setCaretPos = (pos: number): void => {
    if (ref.current) {
      const el = ref.current;

      // if (el.createTextRange) {
      //   var range = el.createTextRange();
      //   range.move('character', pos);
      //   range.select();
      //   return true;
      // }

      // else {
      //   // (el.selectionStart === 0 added for Firefox bug)
      if (el.selectionStart || el.selectionStart === 0) {
        el.focus();
        const p = Math.ceil(pos);
        el.setSelectionRange(p, p);
      } else { // fail city, fortunately this never happens (as far as I've tested) :)
        el.focus();
      }
      // }
    }
  };

  const getRawValue = (val: string = '') => val.split('')
    .filter(v => !(fixedMask.includes(v) || v === placeholderChar))
    .join('');

  function convertToMasked(val: string = ''): string {
    let currCaret: number = 0;
    if (ref.current) {
      currCaret = ref.current.selectionEnd ? ref.current.selectionEnd : 0;
    }

    const oldRawValue = getRawValue(value);
    const rawValue = getRawValue(val);
    let it = 0;
    let newVal = '';
    let newCaretPos: number = currCaret;
    for (let i = 0; i < mask.length; i++) {
      const m = mask[i];
      if (typeof m === 'object') {
        if (it < rawValue.length && rawValue[it].match(m)) {
          newVal += rawValue[it++];
        } else {
          newVal += placeholderChar;
        }
      } else {
        newVal += m;
        if (caret <= i && it < rawValue.length) {
          if (rawValue.length > oldRawValue.length) newCaretPos++;
        }
      }
    }

    setCaret(newCaretPos);

    return newVal;
  }

  const onClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    if (ref.current) {
      const pos = ref.current.selectionStart ? ref.current.selectionStart : 0;
      setCaret(pos);
    }
    if (onClick) onClick(e);
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.currentTarget.value;
    const maskedVal = convertToMasked(inputVal);
    setValue(maskedVal);

    if (onChange) onChange(e, maskedVal);
  };

  const onClearHandler = (e: React.MouseEvent<HTMLElement>) => {
    setValue('');
    setError(false);
    
    if(onClear) onClear(e);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    // const inputVal = e.currentTarget.value;
    // const maskedVal = convertToMasked(inputVal);

    // if (validator) {
    //   if (!maskedVal.includes(placeholderChar)) {
    //     if (typeof validator !== 'function') {
    //       if (validators[validator.name]) {
    //         const isValid = validators[validator.name](validator.type, maskedVal);
    //         setError(!isValid);
    //       }
    //     } else {
    //       setError(validator(maskedVal));
    //     }
    //   } else {
    //     setError(true);
    //   }
    // }

    if (onBlur) onBlur(e);
  };

  return (
    <Input
      {...rest}
      value={value}
      error={error}
      caption={error ? 'Invalid Value' : caption}
      onClick={onClickHandler}
      onChange={onChangeHandler}
      onClear={onClearHandler}
      onBlur={onBlurHandler}
      autocomplete={'off'}
      ref={ref}
    />
  );
});

export default InputMask;
