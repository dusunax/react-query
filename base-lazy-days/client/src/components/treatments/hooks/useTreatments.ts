import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const toast = useCustomToast();

  const fallbackTreatments = [];
  const { data = fallbackTreatments } = useQuery(
    queryKeys.treatments,
    getTreatments,
    {
      staleTime: 400000,
      keepPreviousData: true,
      onError: (err) => {
        const title =
          err instanceof Error
            ? err.message
            : '알 수 없는 에러가 발생했습니다.';
        toast({ title, status: 'error' });
      },
    },
  );

  return data;
}

export function usePrefetchTreatment(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
