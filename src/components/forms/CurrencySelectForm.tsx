
import { useEffect } from 'react';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

interface CurrencySelectProps {
	title: string;
	submitBtnTitle: string;
	onSubmit: (data: { from: string; to: string; amount: number }) => void;
}

const CurrencySelectForm = ({ onSubmit, title, submitBtnTitle }: CurrencySelectProps) => {
	const { rates } = useAppSelector(state => state.rates);

	const [fromCurrency, setFromCurrency] = useState<string>('');
	const [toCurrency, setToCurrency] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);

	useEffect(() => {
		const currencyKeys = Object.keys(rates)
		
		if (currencyKeys.length > 0) {
			setFromCurrency('EUR')
			setToCurrency('USD')
		}
	}, [rates]);

	const handleSubmit = () => {
		onSubmit({
			from: fromCurrency,
			to: toCurrency,
			amount,
		});
	}

	return (
		<div className="flex items-center flex-col text-center gap-4">
			<div>
				<div>{title}</div>
				<input 
					className="border border-slate-500 rounded-md p-1" 
					type="number" 
					onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
				/>
			</div>
			<div className="flex justify-center">
				<div>
					<span>From</span>
					<select
						className="border border-slate-500 rounded-md p-1 ml-2"
						onChange={(e) => setFromCurrency(e.target.value)}
						value={fromCurrency}
					>
						{Object.entries(rates).map(([currency]) => (
							<option key={currency} value={currency}>{currency}</option>
						))}
					</select>
				</div>
				<div className="ml-6">
					<span>To</span>
					<select
						className="border border-slate-500 rounded-md p-1 ml-2"
						onChange={(e) => setToCurrency(e.target.value)}
						value={toCurrency}
					>
						{Object.entries(rates).map(([currency]) => (
							<option key={currency} value={currency}>{currency}</option>
						))}
					</select>
				</div>
			</div>
			<button 
				onClick={handleSubmit} 
				className="rounded-full bg-indigo-600 px-2 py-1 text-white cursor-pointer">
					{submitBtnTitle}
			</button>
		</div>
	)
}

export default CurrencySelectForm;