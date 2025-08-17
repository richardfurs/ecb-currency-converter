import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFee } from '@/store/slices/rates';

import CurrencySelectForm from '@/components/forms/CurrencySelectForm';

const Fee = () => {
  
  interface FeeType {
    from: string;
    to: string;
    amount: number;
  }

  const dispatch = useAppDispatch()
  const { fee } = useAppSelector((state: { rates: { fee: FeeType[] } }) => state.rates);

  const handleSetFee = (data: { from: string; to: string; amount: number } ) => {
    dispatch(setFee(data));
  }

  return (
    <div>
			<CurrencySelectForm onSubmit={handleSetFee} title="Amount in %" submitBtnTitle="Set fee" />

			<div className="flex flex-col items-center justify-center mt-6">
				{fee.length > 0 ? (
					<>
						<h4>Configured fees</h4>
						<table className="table-auto border-collapse border border-gray-400">
							<thead>
								<tr>
									<th className="border border-gray-400 px-2 py-1">From</th>
									<th className="border border-gray-400 px-2 py-1">To</th>
									<th className="border border-gray-400 px-2 py-1">Amount</th>
								</tr>
							</thead>
							<tbody>
								{fee.map((fee: FeeType, index: number) => (
									<tr key={index}>
										<td className="border border-gray-400 px-2 py-1">{fee.from}</td>
										<td className="border border-gray-400 px-2 py-1">{fee.to}</td>
										<td className="border border-gray-400 px-2 py-1">{fee.amount * 100}%</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<p>No fees configured</p>
				)}
			</div>

    </div>
  )
}

export default Fee;