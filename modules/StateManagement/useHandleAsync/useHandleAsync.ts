import { useRef, useState } from "react";
import AsyncStateFactory from "../AsyncState/AsyncStateFactory";
import { Config, ServerStateUtils } from "../Core/StateUtils";
import AsyncUtils from "../AsyncState/AsyncUtils";

interface State<T> { data: T | null, loading: { fetch: AsyncState } }

class AsyncFunctionalClass {
  data: AsyncState;
  constructor(data: AsyncState) {
    this.data = data;
  }

  isLoading() {
    return AsyncUtils.isLoading(this.data);
  }
  isDormant() {
    return AsyncUtils.isDormant(this.data);
  }
  hasFailed() {
    return AsyncUtils.hasFailed(this.data);
  }
  isSuccessful() {
    return AsyncUtils.isSuccessful(this.data);
  }
  getMessage() {
    return this.data.message;
  }
  getInternalState() {
    return this.data;
  }
}

type ResolveType<T> = T extends Promise<infer R> ? R : never;
export default function useHandleAsync<X extends (...args: any[]) => Promise<any>>(fn: X, config?: Config<ResolveType<ReturnType<X>>>): [
  data: ResolveType<ReturnType<X>> | null,
  asyncState: AsyncFunctionalClass,
  fetcher: (...params: Parameters<X>) => void,
  serverUtils: ServerStateUtils<State<ResolveType<ReturnType<X>>>>
] {
  const [state, setState] = useState<State<ResolveType<ReturnType<X>>>>({
    data: null,
    loading: { fetch: AsyncStateFactory() }
  });

  const serverUtils = new ServerStateUtils<State<ResolveType<ReturnType<X>>>>(state, setState);

  const runnerFunc = useRef(async (...params: Parameters<X>) => {
    const res = await serverUtils.handleAsync('fetch', () => fn(...params), config);
    if (res) {
      serverUtils.mutateState(v => {
        v.data = res;
      })
    }
  });

  runnerFunc.current = async (...params: Parameters<X>) => {
    const res = await serverUtils.handleAsync('fetch', () => fn(...params), config);
    if (res) {
      serverUtils.mutateState(v => {
        v.data = res;
      })
    }
  };

  return [state.data, new AsyncFunctionalClass(state.loading.fetch), runnerFunc.current, serverUtils];
}
