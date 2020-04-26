import { h, JSX } from "preact";
import { FooterView } from "./footer";
import { HeaderView } from "./header";
import { IDispatch } from "../ducks/types";
import { MenuItem } from "./menuItem";

interface IProps {
  dispatch: IDispatch;
  email?: string;
}

export function ScreenSettings(props: IProps): JSX.Element {
  return (
    <section className="flex flex-col h-full">
      <HeaderView
        title="Settings"
        left={<button onClick={() => props.dispatch({ type: "PullScreen" })}>Back</button>}
      />
      <section className="flex-1 w-full">
        <MenuItem
          name="Account"
          type="text"
          value={props.email}
          onClick={() => props.dispatch({ type: "PushScreen", screen: "account" })}
        />
        <MenuItem
          name="Timers"
          type="text"
          value={props.email}
          onClick={() => props.dispatch({ type: "PushScreen", screen: "timers" })}
        />
      </section>
      <FooterView dispatch={props.dispatch} />
    </section>
  );
}
