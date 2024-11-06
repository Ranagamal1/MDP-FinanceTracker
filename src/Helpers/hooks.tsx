import { useState, useMemo } from 'react';
import { monthNames, months } from './constants';

const useFinancialData = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [Expenses, setExpenses] = useState([]);
  const [Selectedmonth, setSelectedmonth] = useState(new Date().getMonth() + 1);

  const monthsArray = useMemo(() => {
    return months.map((month, index) => ({
      number: month,
      name: monthNames[index],
    }));
  }, []);

  const [SelectedmonthName, setSelectedmonthName] = useState(
    monthsArray.find(x => x.number === (new Date().getMonth() + 1).toString())?.name
  );

  const updateMonth = (monthNumber:any) => {
    setSelectedmonth(monthNumber);
    const month = monthsArray.find(x => x.number === monthNumber);
    setSelectedmonthName(month?.name);
  };

  return {
    totalIncome,
    setTotalIncome,
    totalExpenses,
    setTotalExpenses,
    Expenses,
    setExpenses,
    Selectedmonth,
    SelectedmonthName,
    updateMonth,
    monthsArray,
  };
};

export default useFinancialData;
