// @ts-nocheck
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from '../../user/hooks/useUser';
import { AppointmentDateMap } from '../types';
import { getAvailableAppointments } from '../utils';
import { getMonthYearDetails, getNewMonthYear, MonthYear } from './monthYear';

/** useQuery 요청 */
async function getAppointments(
  year: string,
  month: string,
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);

  return data;
}

// Hook return: 타입
// types for hook return object
interface UseAppointments {
  appointments: AppointmentDateMap;
  monthYear: MonthYear;
  updateMonthYear: (monthIncrement: number) => void;
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}

// 목적 The purpose of this hook:
//   1. 유저가 선택하는 현재 month/year 추적
//     1a. state를 업데이트
//   2. monthYear에 해당하는 예약 정보를 리턴
//     2a. AppointmentDateMap 포맷을 리턴 (예약 정보 배열 + 날짜 index)
//     2b. 근접한 monthYear를 prefetch합니다.
//   3. 필터 내용 추적 (전체 예약 / 가능한 예약)
//     3a. 해당 monthYear의 가능한 예약만 리턴합니다.
export function useAppointments(): UseAppointments {
  /** ****************** START 1: monthYear state *********************** */
  // 현재 날짜의 monthYear를 가져옵니다. (monthYear 기본값)
  const currentMonthYear = getMonthYearDetails(dayjs());

  // 유저가 선택하는 현재 monthYear를 추적합니다.
  // (Hook이 객체로 return)
  const [monthYear, setMonthYear] = useState(currentMonthYear);

  // update obj의 setter (유저가 view에서 month를 바꿀 때)
  // (Hook이 객체로 return)
  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
  }
  /** ****************** START 2: 예약 filter ****************** */
  // 필터 적용할 지 여부
  const [showAll, setShowAll] = useState(false);

  // 여기 코드 작성
  // getAvailableAppointments import,
  // appointments that the logged-in user has reserved (in white)
  const { user } = useUser();

  /** ****************** START 3: useQuery  ***************************** */
  // useQuery 요청 (현재 monthYear로 예약 정보 가져오기)

  const queryClient = useQueryClient();

  useEffect(() => {
    // 프리패치 진행, 변수명 겹쳐서 Function 붙임
    const prefetchQueryFunction = (nearMonthYear) => {
      const { year, month } = nearMonthYear;

      // queryClient의 prefetchQuery => inactive 데이터를 패치합니다.
      queryClient.prefetchQuery([queryKeys.appointments, year, month], () =>
        getAppointments(year, month),
      );
    };

    prefetchQueryFunction(getNewMonthYear(monthYear, 1)); // getNewMonthYear 리턴값 => MonthYear 객체
    prefetchQueryFunction(getNewMonthYear(monthYear, -1));
  }, [monthYear, queryClient]);

  // 할 일 : useQuery로 업데이트
  // 내용 :
  //    1. 예약은 AppointmentDateMap 형태 (객체: 날짜가 properties, 예약 내용이 배열 값)
  //    2. getAppointments 쿼리 함수는 monthYear.year와 monthYear.month 필요 (`/appointments/${year}/${month}`)

  const fallback = {}; // fallback 준비
  const { data: appointments = fallback } = useQuery(
    // useQuery에서 data 뽑음 => 약속으로 이름 변경, 기본값 fallback
    [queryKeys.appointments, monthYear.year, monthYear.month], // 쿼리 키 (객체로 휴먼 에러 방지)
    // queryKeys.appointment : 모든 키에 공통되는 값
    () => getAppointments(monthYear.year, monthYear.month), // 콜백으로
    // keepPreviousData: 화면 구성(달력 요일)이 달마다 계속 바뀌므로, 기존 데이터를 보관하면 안됩니다.
  );

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
}
