import AsyncStateFactory from './AsyncStateFactory';

type AsyncGroup = 'One' | 'All';

export class AsyncUtilsCore {
  static isDormant(lookfor: AsyncGroup = 'One', ...astates: AsyncState[]) {
    if (lookfor === 'One')
      return astates.reduce((a, c) => a || c.status === 'dormant', false);
    else return astates.reduce((a, c) => a && c.status === 'dormant', true);
  }
  static isLoading(lookfor: AsyncGroup = 'One', ...astates: AsyncState[]) {
    if (lookfor === 'One')
      return astates.reduce((a, c) => a || c.status === 'initialized', false);
    else return astates.reduce((a, c) => a && c.status === 'initialized', true);
  }

  static isSuccessful(lookfor: AsyncGroup = 'One', ...astates: AsyncState[]) {
    if (lookfor === 'All')
      return astates.reduce((a, c) => a && c.status === 'success', true);
    else return astates.reduce((a, c) => a || c.status === 'success', false);
  }
  static hasFailed(lookfor: AsyncGroup = 'One', ...astates: AsyncState[]) {
    if (lookfor === 'One')
      return astates.reduce((a, c) => a || c.status === 'failed', false);
    else return astates.reduce((a, c) => a && c.status === 'failed', true);
  }
}

export default class AsyncUtils {
  static isDormant(...astates: AsyncState[]) {
    return AsyncUtilsCore.isDormant('One', ...astates);
  }
  static isLoading(...astates: AsyncState[]) {
    return astates.reduce((a, c) => a || c.status === 'initialized', false);
  }

  static isSuccessful(...astates: AsyncState[]) {
    return astates.reduce((a, c) => a && c.status === 'success', true);
  }
  static hasFailed(...astates: AsyncState[]) {
    return astates.reduce((a, c) => a || c.status === 'failed', false);
  }

  static initLoading(names: string[]) {
    type LoadingNameUnion = (typeof names)[number];

    const obj: Record<LoadingNameUnion, AsyncState> = {};
    for (const name of names) {
      obj[name] = AsyncStateFactory();
    }

    return obj;
  }
}

export class StateLoadingUtils<T extends string> extends AsyncUtils {
  private loading: Record<string, AsyncState>;
  private selected: AsyncState | AsyncState[] | null = null;

  constructor(loading: Record<string, AsyncState>) {
    super();
    this.loading = loading;
  }

  set(key: T) {
    this.selected = this.loading[key];
    return this;
  }

  group(keys: T[]) {
    this.selected = [];
    for (const key of keys) {
      this.selected.push(this.loading[key]);
    }
    return this;
  }

  get(key: T) {
    return this.loading[key];
  }

  isDormant() {
    if (this.selected === null) return false;

    if (Array.isArray(this.selected)) {
      return AsyncUtils.isDormant(...this.selected);
    }

    return AsyncUtils.isDormant(this.selected);
  }
  isLoading() {
    if (this.selected === null) return false;

    if (Array.isArray(this.selected)) {
      return AsyncUtils.isLoading(...this.selected);
    }

    return AsyncUtils.isLoading(this.selected);
  }
  isSuccessful() {
    if (this.selected === null) return false;

    if (Array.isArray(this.selected)) {
      return AsyncUtils.isSuccessful(...this.selected);
    }

    return AsyncUtils.isSuccessful(this.selected);
  }
  hasFailed() {
    if (this.selected === null) return false;
    if (Array.isArray(this.selected)) {
      return AsyncUtils.hasFailed(...this.selected);
    }

    return AsyncUtils.hasFailed(this.selected);
  }
}
