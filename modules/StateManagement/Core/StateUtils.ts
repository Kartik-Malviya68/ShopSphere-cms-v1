/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

export default class StateUtils<T> {
  protected state: T;
  protected setState: (setter: (newState: T) => T) => void;

  constructor(state: T, setState: (setter: (newState: T) => T) => void) {
    this.state = state;
    this.setState = setState;
  }

  public mutateState(setter: (state: T) => void) {
    this.setState((s) => {
      const newState = { ...s };
      setter(newState);
      return newState;
    });
  }
}

export interface Config<T> {
  initializedMessage?: string;
  successMessage?: string;
  errMessage?: string | ((err: AxiosError<any, any>) => string);
  onStart?: () => void;
  onError?: (err: AxiosError<any, any>) => void;
  onSuccess?: (data: T) => void;
  onEnd?: (data?: T, err?: AxiosError<any, any>) => void;
}

export class ServerStateUtils<
  T extends { loading: Record<string, AsyncState> },
> extends StateUtils<T> {
  public async handleAsync<T = any>(
    name: string,
    fn: () => Promise<T>,
    config?: Config<T>
  ) {
    const conf = config ? config : {};
    const {
      initializedMessage = 'initialized',
      successMessage = 'successful',
      errMessage = 'failed',
    } = conf;

    this.mutateState((p) => {
      p.loading[name] = {
        status: 'initialized',
        message: initializedMessage,
        meta: p.loading[name]?.meta
      };
    });
    conf.onStart && conf.onStart();
    try {
      const val = await fn();
      this.mutateState((p) => {
        p.loading[name] = {
          status: 'success',
          message: successMessage,
          meta: p.loading[name]?.meta
        };
      });
      conf.onSuccess && conf.onSuccess(val);
      return val;
    } catch (err) {
      const error = err as AxiosError<any, any>;
      conf.onError && conf.onError(error);
      const message =
        error.status && error.status >= 500
          ? 'server error'
          : typeof errMessage === 'string'
            ? errMessage
            : errMessage(error);
      console.log('error received wasa', error);
      this.mutateState((p) => {
        p.loading[name] = {
          status: 'failed',
          message,
          meta: p.loading[name]?.meta
        };
      });
    } finally {
      conf.onEnd && conf.onEnd();
    }
  }

  public setLoading(name: string, state: AsyncStatus, message?: string) {
    this.mutateState((p) => {
      p.loading[name].status = state;
      const data = p.loading[name].message;
      p.loading[name].message = message ? message : data;
      meta: p.loading[name]?.meta
    });
  }
}

export class ModalUtils<T extends { modals: Record<string, { show: boolean }> }> extends StateUtils<T> {
  modalName: string;
  constructor(name: string, state: T, setState: (setter: (newState: T) => T) => void) {
    super(state, setState);
    this.modalName = name;
  }

  isVisible() {
    return this.state.modals[this.modalName].show === true;
  }
  isHidden() {
    return this.state.modals[this.modalName].show === false;
  }

  showModal() {
    this.mutateState(v => {
      v.modals[this.modalName].show = true;
    })
  }
  hideModal() {
    this.mutateState(v => {
      v.modals[this.modalName].show = false;
    })
  }

  hideModalName(name: string) {
    this.mutateState(v => {
      v.modals[name].show = false;
    })
  }
}
