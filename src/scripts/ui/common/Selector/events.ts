import { SelectionValue } from 'ui/event';
import { SelectorOnChange, SelectorOnDelete } from 'ui/common/Selector';

type SelectorAction = 'UP' | 'DOWN' | 'DELETE';

const preventScroll = (e: WheelEvent): void => {
  e.preventDefault();
};

const setPreventScroll = (elm: HTMLElement | null): void => {
  const cont = elm ? elm.closest('main') : null;
  if (cont) {
    cont.addEventListener('wheel', preventScroll);
  }
};

const releasePreventScroll = (elm: HTMLElement | null): void => {
  const cont = elm ? elm.closest('main') : null;
  if (cont) {
    cont.removeEventListener('wheel', preventScroll);
  }
};

const change = <T extends string | number>(
  value: T | null,
  values: SelectionValue<T>[],
  defaultValue: T | null,
  step: number,
  shiftStep: number,
  onChange: SelectorOnChange<T>,
  onDelete: SelectorOnDelete,
  action: SelectorAction,
  shiftKey: boolean
): void => {
  const index = values.findIndex((val) => val.value === value);
  const firstValue = values[0].value;
  const lastValue = values[values.length - 1].value;
  const startValue = defaultValue ?? firstValue; // first value when no value set

  step *= shiftKey ? shiftStep : 1;

  switch (action) {
    case 'UP':
      if (-1 !== index) {
        const selected = values[index + step];
        onChange(selected ? selected.value : lastValue);
      } else {
        onChange(startValue);
      }
      break;

    case 'DOWN':
      if (-1 !== index) {
        const selected = values[index - step];
        onChange(selected ? selected.value : firstValue);
      } else {
        onChange(startValue);
      }
      break;

    case 'DELETE':
      onDelete();
      break;

    default:
    // do nothing
  }
};

const keyup = <T extends string | number>(
  value: T | null,
  values: SelectionValue<T>[],
  defaultValue: T | null,
  step: number,
  shiftStep: number,
  onChange: SelectorOnChange<T>,
  onDelete: SelectorOnDelete
) => {
  return (e: React.KeyboardEvent) => {
    let action: SelectorAction | null = null;
    e.preventDefault();

    switch (e.code) {
      case 'ArrowDown':
      case 'ArrowLeft':
        action = 'DOWN';
        break;

      case 'ArrowUp':
      case 'ArrowRight':
        action = 'UP';
        break;

      case 'Delete':
        action = 'DELETE';
        break;

      default:
      // do nothing
    }
    if (action) {
      change(
        value,
        values,
        defaultValue,
        step,
        shiftStep,
        onChange,
        onDelete,
        action,
        e.shiftKey
      );
    }
  };
};

const wheel = <T extends string | number>(
  value: T | null,
  values: SelectionValue<T>[],
  defaultValue: T | null,
  step: number,
  shiftStep: number,
  onChange: SelectorOnChange<T>,
  onDelete: SelectorOnDelete
) => {
  return (e: React.WheelEvent) => {
    let action: SelectorAction | null = null;

    if (e.deltaY > 0) {
      action = 'DOWN';
    } else if (e.deltaY < 0) {
      action = 'UP';
    }
    if (action) {
      change(
        value,
        values,
        defaultValue,
        step,
        shiftStep,
        onChange,
        onDelete,
        action,
        e.shiftKey
      );
    }
  };
};

export const selectorEvents = {
  setPreventScroll,
  releasePreventScroll,
  keyup,
  wheel,
};
