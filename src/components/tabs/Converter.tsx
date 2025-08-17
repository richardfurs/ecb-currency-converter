import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { convert } from '@/store/slices/rates';

import CurrencySelectForm from '@/components/forms/CurrencySelectForm';

const Converter = () => {
  const dispatch = useAppDispatch()
  const { result, targetCurrency } = useAppSelector(state => state.rates);

  const handleConvert = (data: { from: string; to: string; amount: number } ) => {
    dispatch(convert(data));
  }

  return (
    <div>
      <CurrencySelectForm onSubmit={handleConvert} title="Amount" submitBtnTitle="Convert" />

      {result !== undefined && result !== null && (
        <div className="flex items-center justify-center mt-6">
          <h4>Result: </h4>
					<span className="font-bold ml-1">{ result }</span>
					<span>{ targetCurrency }</span>
        </div>
      )}
    </div>
  )
}

export default Converter;
