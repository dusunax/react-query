import dayjs from 'dayjs';

// for storing current month / year details
export interface MonthYear {
  startDate: dayjs.Dayjs; // 첫 날에 대한 정보
  firstDOW: number; // 첫 Day of week, 0부터
  lastDate: number; // 달의 마지막 날
  monthName: string; // 달의 영어 이름
  month: string; // 달, mm
  year: string; // 년, yyyy
}

// MonthYear 증감
export function getUpdatedMonthYear(
  monthYear: MonthYear,
  monthIncrement: number, // +1, -1
): dayjs.Dayjs {
  return monthYear.startDate.clone().add(monthIncrement, 'months'); // 뮤테이션을 막기 위해 클론합니다.
}

// 캘린더 정보를 가져옴
export function getMonthYearDetails(initialDate: dayjs.Dayjs): MonthYear {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = dayjs(`${year}${month}01`);
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.clone().endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function getNewMonthYear(
  prevData: MonthYear,
  monthIncrement: number,
): MonthYear {
  const newMonthYear = getUpdatedMonthYear(prevData, monthIncrement); // getUpdatedMonthYear로 이전 데이터, 새 증감 내용 전달 => 업데이트

  // newMonthYear를 사용해서 해당 캘린더 내용을 가져오고, return합니다.
  return getMonthYearDetails(newMonthYear);
}
