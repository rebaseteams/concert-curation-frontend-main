import { useState } from 'react';
import { BaseResourceType, FilterType, SimpleResourceInterface } from '../../../model/interfaces/generics';

export type UseResources<T, U> = () => {
  data?: Array<T>;
  getAll: (filter?: U) => void;
  getAllSync: (filter?: U, o?: Options) => Promise<T[]>;
  setSync: (s: T) => Promise<T>;
  getSync: (id: string) => Promise<T>;
  loading: boolean;
}

type Options = {
  enableLoading?: boolean, enableResource?: boolean
}

export interface UseGetAllResources<V> {
  useService: () => V;
}

export function createUseResources<
  T extends BaseResourceType, U extends FilterType, V extends SimpleResourceInterface<T, U>
>({
  useService,
}: UseGetAllResources<V>): UseResources<T, U> {
  return () => {
    const resourceAdminService = useService();
    const [resources, setResources] = useState<Array<T>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const apiCall = async (filter?: U) => {
      setLoading(true);
      const r = await resourceAdminService.getAll({
        getAll: true,
        ...filter,
      } as unknown as U) as T[];
      setResources(r);
      setLoading(false);
    };

    const getSync = async (id: string) => {
      const c = await resourceAdminService.get(id);

      return c;
    };

    const setSync = async (c: T) => {
      const res = await resourceAdminService.set(c);

      return res;
    };

    // pass options to disable state change inside this hook
    // eslint-disable-next-line
    const getAllSync = async (filter?: any, options?: Options) => {
      const { enableLoading, enableResource } = options
        || { enableLoading: true, enableResource: true };
      if (enableLoading) {
        setLoading(true);
      }
      const c = await resourceAdminService.getAll({
        getAll: true,
        ...filter,
      }) as T[];
      if (enableResource) {
        setResources(c);
      }
      if (enableLoading) {
        setLoading(false);
      }
      return c;
    };

    // useEffect(() => { apiCall(); }, []);

    return {
      data: resources,
      getAll: (filter?: U) => {
        apiCall(filter);
      },
      getAllSync,
      getSync: (id: string) => getSync(id),
      setSync: (c: T) => setSync(c),
      loading,
    };
  };
}
