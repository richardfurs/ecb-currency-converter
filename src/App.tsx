
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { fetchRates } from '@/store/slices/rates';
import { useSearchParams } from "react-router";
import Converter from '@/components/tabs/Converter';
import Fee from '@/components/tabs/Fee';


const App = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.rates);
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  useEffect(() => {
    dispatch(fetchRates());

    if (!tab) {
      setSearchParams({ tab: 'converter' }, { replace: true });
    }
  }, [dispatch, tab, setSearchParams])

  const navigateTabs = (tabName: string) => {
    setSearchParams({ tab: tabName }, { replace: true });
  }

  if (loading) return <div className="flex flex-col mt-34 items-center">Loading...</div>
  if (error) return <div className="flex flex-col mt-34 items-center">Error: {error}</div>

  return (
    <div className="flex flex-col mt-34 items-center">
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`rounded-full px-2 py-1 text-white cursor-pointer ${
            tab === 'converter' ? 'bg-indigo-600' : 'bg-gray-400'
          }`}
          onClick={() => navigateTabs('converter')}
        >
          Converter
        </button>

        <button
          className={`rounded-full px-2 py-1 text-white cursor-pointer ${
            tab === 'fee' ? 'bg-indigo-600' : 'bg-gray-400'
          }`}
          onClick={() => navigateTabs('fee')}
        >
          Fee config
        </button>
      </div>

      {tab === "converter" && <Converter />}
      {tab === "fee" && <Fee />}
    </div>
  )
}

export default App;
