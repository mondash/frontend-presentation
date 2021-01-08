import React, { createContext, useContext, useReducer } from "react";

type Action =
  | { type: "INCREMENT" }
  | { type: "INCREMENT_ASYNC" }
  | { type: "RESET" }
  | { type: "SET", value: number };
type Dispatch = (action: Action) => void;
type State = {
  counter: number;
};
type Props = {
  children: React.ReactNode;
};

const CounterDispatchContext = createContext<Dispatch | undefined>(undefined);
const CounterStateContext = createContext<State | undefined>(undefined);

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "RESET":
      return {
        ...state,
        counter: 0,
      };
    case "SET":
      return {
        ...state,
        counter: action.value,
    };
    default:
      throw new Error("Unhandled action type in CounterContext reducer.");
  }
}

function asyncMiddleware(dispatch: Dispatch): Dispatch {
  return async (action) => {
    switch (action.type) {
      case "INCREMENT_ASYNC":
        setTimeout(() => dispatch({ type: "INCREMENT" }), 1000);
        break;
      default:
        return dispatch(action);
      }
    }
}


function useCounterDispatch(): Dispatch {
  const context = useContext(CounterDispatchContext);
  if (context === undefined) {
    throw new Error("useCounterContext must be used within a CounterProvider.");
  }
  return context;
}

function useCounterState(): State {
  const context = useContext(CounterStateContext);
  if (context === undefined) {
    throw new Error("useCounterState must be used within a CounterProvider.");
  }
    return context;
}

function useCounter(): [State, Dispatch] {
  return [useCounterState(), useCounterDispatch()];
}

const CounterProvider: React.FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(counterReducer, { counter: 0 });

  return (
    <CounterDispatchContext.Provider value={asyncMiddleware(dispatch)}>
      <CounterStateContext.Provider value={state}>
        {children}
      </CounterStateContext.Provider>
    </CounterDispatchContext.Provider>
  );
};

export { CounterProvider, useCounter, useCounterDispatch, useCounterState };
