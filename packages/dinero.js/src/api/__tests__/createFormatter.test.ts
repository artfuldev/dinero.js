import { up } from '@dinero.js/core';
import { USD } from '@dinero.js/currencies';

import { createFormatter, dinero } from '../../..';

describe('createFormatter', () => {
  it('formats the Dinero object with the passed transformer', () => {
    const format = createFormatter<number>(
      ({ amount, currency }) => `${currency.code} ${amount}`
    );

    const d = dinero({ amount: 500, currency: USD });

    expect(format(d)).toBe('USD 5');
  });
  it('formats the Dinero object with the passed transformer and options', () => {
    const formatOptions = {
      digits: 1,
      round: up,
    };
    const format = createFormatter(
      ({ amount, currency }) => `${currency.code} ${amount}`,
      formatOptions
    );

    const d = dinero({ amount: 4545, currency: USD });

    expect(format(d)).toBe('USD 45.5');
  });
});
