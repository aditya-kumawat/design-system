import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputMask } from '@/index';
// import inputMask from '..';
// import { Simulate } from 'react-dom/test-utils';

let onChange = jest.fn();
beforeEach(() => {
  onChange = jest.fn();
});
beforeAll(() => {
  console.error = () => { };
})
// const event = new Synte
// const mask = [];

describe('InputMask component', () => {
  // it('with className', () => {
  //   const { getByTestId } = render(
  //     <InputMask mask={[]} className="InputClass" />
  //   );
  //   expect(getByTestId('DesignSystem-InputMask')).toBeInTheDocument();
  //   expect(getByTestId('DesignSystem-InputMask')).toHaveClass('InputClass');
  // });

  // it('renders with `mask: []`', () => {
  //   const { getByTestId } = render(
  //     <InputMask mask={[]} />
  //   );
  //   expect(getByTestId('DesignSystem-InputMask')).toBeInTheDocument();
  //   const inputEl = getByTestId('DesignSystem-InputMask--Input');
  //   expect(inputEl).toBeInTheDocument();
  //   // fireEvent.focus(inputEl);
  //   // expect(inputEl).toHaveAttribute('value', '');
  // });

  // describe('renders with `mask: [/\d/, /\D/]`', () => {
  //   it('handles focus and blur event', () => {
  //     const { getByTestId } = render(
  //       <InputMask mask={[/\d/, /\D/]} />
  //     );
  //     const inputEl = getByTestId('DesignSystem-InputMask--Input');
  //     expect(getByTestId('DesignSystem-InputMask')).toBeInTheDocument();
  //     expect(inputEl).toBeInTheDocument();

  //     expect(inputEl).toHaveAttribute('value', '');
  //     fireEvent.focus(inputEl);
  //     expect(inputEl).toHaveAttribute('value', '__');
  //     fireEvent.blur(inputEl);
  //     expect(inputEl).toHaveAttribute('value', '');
  //   });

  //   it('handles sequential keypress in correct order', () => {
  //     const { getByTestId } = render(
  //       <InputMask mask={[/\d/, /\D/]} onChange={onChange} />
  //     );
  //     const inputEl = getByTestId('DesignSystem-InputMask--Input');
  //     // fireEvent.focus(inputEl);
  //     // expect(inputEl).toHaveAttribute('value', '__');
  //     // fireEvent.change(inputEl, { target: { value: 1 }});
  //     // fireEvent.keyPress(inputEl, { key: '1', code: 'Digit1', keyCode: 49 });
  //     // fireEvent.keyUp(inputEl, { key: '1', code: 'Digit1', keyCode: 49 });
  //     // fireEvent.keyDown(inputEl, { key: '1', code: 'Digit1', keyCode: 49 });
  //     // fireEvent.keyPress(inputEl, { key: 1, code: 'Digit1', charCode: 49, keyCode: 49 });
  //     // fireEvent.keyUp(inputEl, { key: 1, code: 'Digit1', charCode: 49, keyCode: 49 });
  //     // fireEvent.keyDown(inputEl, { key: 1, code: 'Digit1', charCode: 49, keyCode: 49 });
  //     // fireEvent.keyPress(inputEl, { key: '1', keyCode: 49 });
  //     // fireEvent.keyUp(inputEl, { key: '1', keyCode: 49 });
  //     // fireEvent.keyDown(inputEl, { key: '1', keyCode: 49 });
  //     // act(() => {
  //     //   expect(inputEl).toHaveAttribute('value', '1_');
  //     // });

  //     fireEvent.focus(inputEl);
  //     act(() => {
  //       userEvent.type(inputEl, '1', { initialSelectionStart: 0, initialSelectionEnd: 0 });
  //     });
  //     expect(onChange).toBeCalledTimes(1);
  //     expect(onChange).lastCalledWith(expect.anything(), '1_');
  //     act(() => {
  //       userEvent.type(inputEl, 'a', { initialSelectionStart: 1, initialSelectionEnd: 1 });
  //     });
  //     expect(onChange).toBeCalledTimes(2);
  //     expect(onChange).lastCalledWith(expect.anything(), '1a');
  //   });

  //   it('handles handles sequential keypress in reverse order', () => {
  //     const { getByTestId } = render(
  //       <InputMask mask={[/\d/, /\D/]} onChange={onChange} />
  //     );
  //     const inputEl = getByTestId('DesignSystem-InputMask--Input');

  //     fireEvent.focus(inputEl);
  //     act(() => {
  //       userEvent.type(inputEl, 'a', { initialSelectionStart: 1, initialSelectionEnd: 1 });
  //     });
  //     expect(onChange).toBeCalledTimes(1);
  //     expect(onChange).lastCalledWith(expect.anything(), '_a');
  //     act(() => {
  //       userEvent.type(inputEl, '1', { initialSelectionStart: 0, initialSelectionEnd: 0 });
  //     });
  //     expect(onChange).toBeCalledTimes(2);
  //     expect(onChange).lastCalledWith(expect.anything(), '1a');
  //   });

  //   it('handles error cases', () => {
  //     const { getByTestId } = render(
  //       <InputMask mask={[/\d/, /\D/]} onChange={onChange} />
  //     );
  //     const inputEl = getByTestId('DesignSystem-InputMask--Input');

  //     fireEvent.focus(inputEl);
  //     act(() => {
  //       userEvent.type(inputEl, 'a', { initialSelectionStart: 0, initialSelectionEnd: 0 });
  //     });
  //     expect(onChange).toBeCalledTimes(1);
  //     expect(onChange).lastCalledWith(expect.anything(), '__');
  //     act(() => {
  //       userEvent.type(inputEl, '1', { initialSelectionStart: 1, initialSelectionEnd: 1 });
  //     });
  //     expect(onChange).toBeCalledTimes(2);
  //     expect(onChange).lastCalledWith(expect.anything(), '__');
  //   });

    it('handles backspace cases', async () => {
      const { getByTestId } = render(
        <InputMask mask={[/\d/, /\D/]} onChange={onChange} />
      );
      const inputEl = getByTestId('DesignSystem-InputMask--Input');
      // const inputEl = screen.getByTestId('DesignSystem-InputMask--Input');

      fireEvent.focus(inputEl);
      // ref.setSelectionRange(0, 2);
      // await userEvent.type(inputEl, '1a', { delay: 5 });
      // act(() => {
        userEvent.type(inputEl, '1', { initialSelectionStart: 0, initialSelectionEnd: 0});
      // });
      // act(() => {
        userEvent.type(inputEl, 'a', { initialSelectionStart: 1, initialSelectionEnd: 1});
      // });
      expect(onChange).lastCalledWith(expect.anything(), '1a');
      // act(() => {
      // @ts-ignore
        inputEl.setSelectionRange(1, 2);
        userEvent.type(inputEl, '{backspace}');
        expect(onChange).lastCalledWith(expect.anything(), '1_');
        // userEvent.type(inputEl, '{backspace}', { initialSelectionStart: 1, initialSelectionEnd: 1 });
        // expect(onChange).lastCalledWith(expect.anything(), '__');
        // userEvent.type(inputEl, '{backspace}', { initialSelectionStart: 1, initialSelectionEnd: 1 });
        // expect(onChange).lastCalledWith(expect.anything(), '__');
      // });
      // expect(onChange).toBeCalledTimes(3);
      
      // act(() => {
      //   userEvent.type(inputEl, '{backspace}', { initialSelectionStart: 1, initialSelectionEnd: 1 });
      // });
      // expect(onChange).toBeCalledTimes(4);
      // expect(onChange).lastCalledWith(expect.anything(), '_a');
      // act(() => {
      //   userEvent.type(inputEl, '{backspace}', { initialSelectionStart: 1, initialSelectionEnd: 1 });
      // });
      // expect(onChange).lastCalledWith(expect.anything(), '__');
    });

    it('handles multiple add', () => {
      // const { getByTestId } = render(
      //   <InputMask mask={[/\d/, /\D/]} onChange={onChange} />
      // );
      // const inputEl = getByTestId('DesignSystem-InputMask--Input');

      // fireEvent.focus(inputEl);
      // act(() => {
      //   userEvent.type(inputEl, 'a', { initialSelectionStart: 0, initialSelectionEnd: 0 });
      // });
      // expect(onChange).toBeCalledTimes(1);
      // expect(onChange).lastCalledWith(expect.anything(), '__');
      // act(() => {
      //   userEvent.type(inputEl, '1', { initialSelectionStart: 1, initialSelectionEnd: 1 });
      // });
      // expect(onChange).toBeCalledTimes(2);
      // expect(onChange).lastCalledWith(expect.anything(), '__');
    });

    it('handles multiple delete', () => {
      // const { getByTestId } = render(
      //   <InputMask mask={[/\d/, /\D/]} onChange={onChange} />
      // );
      // const inputEl = getByTestId('DesignSystem-InputMask--Input');

      // fireEvent.focus(inputEl);
      // act(() => {
      //   userEvent.type(inputEl, 'a', { initialSelectionStart: 0, initialSelectionEnd: 0 });
      // });
      // expect(onChange).toBeCalledTimes(1);
      // expect(onChange).lastCalledWith(expect.anything(), '__');
      // act(() => {
      //   userEvent.type(inputEl, '1', { initialSelectionStart: 1, initialSelectionEnd: 1 });
      // });
      // expect(onChange).toBeCalledTimes(2);
      // expect(onChange).lastCalledWith(expect.anything(), '__');
    });
  // });


});