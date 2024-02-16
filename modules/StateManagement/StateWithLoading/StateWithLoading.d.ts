type StateWithLoading<T> = T & { loading: Record<string, AsyncState> };
