import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Fee {
  from: string;
  to: string;
  amount: number;
}

interface RatesState {
  rates: Record<string, number>
  loading: boolean
  error: string | null
  result: number | null
	fee: Fee[],
  targetCurrency: string | null
}

const initialState: RatesState = {
  rates: {},
  loading: false,
  error: null,
  result: null,
	fee: [],
  targetCurrency: null
}

export const fetchRates = createAsyncThunk(
  'rates/fetchRates',
  async () => {
    const response = await fetch('/api/rates');
		const xmlString = await response.text();

		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
		const rateNodes = xmlDoc.querySelectorAll('Cube[currency][rate]');
		const rates: Record<string, number> = {'EUR': 1};

		rateNodes.forEach(node => {
			const currency = node.getAttribute('currency');
			const rate = node.getAttribute('rate');

			if (currency && rate) {
				rates[currency] = parseFloat(rate)
			}
		})

		return rates;
  }
)

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
		setFee: (
			state,
			action: PayloadAction<{ from: string; to: string; amount: number }>
		) => {
			const { from, to, amount } = action.payload;

			if (!amount || amount > 100 || !from || !to) {
				state.error = 'Invalid fee data provided';
				
        return;
			}

			state.fee.push({
				from: from,
				to: to,
				amount: amount === 100 ? 1 : amount / 100
			})
		},
    convert: (
      state,
      action: PayloadAction<{ from: string; to: string; amount: number }>
    ) => {
      const { from, to, amount } = action.payload;

      if (!state.rates[from] || !state.rates[to]) {
        state.result = null;
        state.error = 'Invalid currency selection';
				
        return;
      }

      const feeAmount = state.fee.find(f => f.from === from && f.to === to)?.amount ?? 0;

      const amountInEur = amount / state.rates[from];
			const converted = (amountInEur - amountInEur * feeAmount) * state.rates[to];


      state.result = parseFloat(converted.toFixed(2));
      state.error = null;
      state.targetCurrency = to;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRates.fulfilled, (state, action: PayloadAction<Record<string, number>>) => {
        state.loading = false
        state.rates = action.payload
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch rates'
      })
  },
})

export default ratesSlice.reducer
export const { convert, setFee } = ratesSlice.actions;
