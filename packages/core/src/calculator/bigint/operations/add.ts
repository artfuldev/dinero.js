import { BinaryOperation } from '@dinero.js/core';

/**
 * Returns the sum of two bigints.
 *
 * @param augend The bigint to add to.
 * @param addend The bigint to add.
 *
 * @returns The sum of the two bigints.
 */
const add: BinaryOperation<bigint> = (augend, addend) => {
  return augend + addend;
};

export default add;
