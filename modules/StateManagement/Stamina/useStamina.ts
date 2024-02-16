import { useState } from "react";
import StateUtils from "../Core/StateUtils";

interface StaminaConfig<T, X extends Object> {
  initialState: T | (() => T);
  actions: Record<keyof X, (v: T) => void>;
}

export default function useStamina<T = any, X extends Object = {}>(config: StaminaConfig<T, X>): [
  T, Record<keyof X, () => void>, ((setter: (state: T) => void) => void)
] {
  const { initialState, actions } = config;
  const [state, setState] = useState<T>(initialState);

  const stateUtils = new StateUtils<T>(state, setState);

  const hyActions: Record<keyof X, () => void> = {} as Record<keyof X, () => void>;
  for (const key of Object.keys(actions)) {
    hyActions[key as keyof X] = () => {
      stateUtils.mutateState(actions[key as keyof X]);
    };
  }

  return [state, hyActions, (setter: (state: T) => void) => stateUtils.mutateState(setter)];
}
