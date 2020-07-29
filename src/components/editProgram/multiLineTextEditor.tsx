import { h, JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { CodeEditor } from "../../editor";
import { IEither } from "../../utils/types";
import { EvalResultInEditor } from "../evalResultInEditor";

interface IProps {
  onChange?: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  result?: IEither<number | undefined, string>;
  value?: string;
  state: Record<string, number>;
}

export function MultiLineTextEditor(props: IProps): JSX.Element {
  const codeEditor = useRef(
    new CodeEditor({
      state: props.state,
      onChange: props.onChange,
      onBlur: props.onBlur,
      value: props.value,
      multiLine: true,
    })
  );

  useEffect(() => {
    codeEditor.current.attach(divRef.current!);
  }, []);

  useEffect(() => {
    codeEditor.current.updateState(props.state);
  });

  const divRef = useRef<HTMLDivElement>();

  let className =
    "relative z-10 block w-full px-2 py-2 leading-normal bg-white border rounded-lg appearance-none focus:outline-none focus:shadow-outline";
  if (props.result != null && !props.result.success) {
    className += " border-red-500";
  } else {
    className += " border-gray-300";
  }

  return (
    <div>
      {props.result && <EvalResultInEditor result={props.result} />}
      <div className={className} ref={divRef}></div>
    </div>
  );
}