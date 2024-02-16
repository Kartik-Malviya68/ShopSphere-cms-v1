type AsyncStatus = 'dormant' | 'initialized' | 'success' | 'failed';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AsyncState<T = any> {
  status: AsyncStatus;
  message: string;
  meta?: T;
}
interface AsyncStateFactory<T> {
  status?: AsyncStatus;
  message?: string;
  meta?: T;
}
