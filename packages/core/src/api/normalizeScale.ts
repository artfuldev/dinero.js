import { convertScale } from '.';
import { Dinero } from '../types';
import { maximum } from '../utils';
import { Dependencies } from './types';

export type NormalizeScaleDependencies<TAmount> = Dependencies<
  TAmount,
  'add' | 'compare' | 'multiply' | 'power' | 'round' | 'subtract' | 'zero'
>;

export function normalizeScale<TAmount>({
  calculator,
}: NormalizeScaleDependencies<TAmount>) {
  const maximumFn = maximum(calculator);
  const convertScaleFn = convertScale({ calculator });

  return function _normalizeScale(
    dineroObjects: ReadonlyArray<Dinero<TAmount>>
  ) {
    const highestScale = dineroObjects.reduce((highest, current) => {
      const { scale } = current.toJSON();

      return maximumFn([highest, scale]);
    }, calculator.zero());

    return dineroObjects.map((d) => {
      const { scale } = d.toJSON();

      return scale !== highestScale
        ? convertScaleFn(d, highestScale, calculator.round)
        : d;
    });
  };
}
