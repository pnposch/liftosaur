import { JSX, h } from "preact";
import { useState } from "preact/hooks";
import { IPlannerProgramExercise } from "../../../pages/planner/models/types";
import { GroupHeader } from "../../groupHeader";
import { PlannerProgramExercise } from "../../../pages/planner/models/plannerProgramExercise";
import { Markdown } from "../../markdown";

interface IEditProgramUiDescriptionsProps {
  header: string;
  plannerExercise: IPlannerProgramExercise;
  onUpdate?: (index: number) => void;
  showCurrent?: boolean;
}

export function EditProgramUiDescriptions(props: IEditProgramUiDescriptionsProps): JSX.Element {
  const plannerExercise = props.plannerExercise;
  const [descriptionIndex, setDescriptionIndex] = useState(
    PlannerProgramExercise.currentDescriptionIndex(plannerExercise)
  );
  const description = (plannerExercise.descriptions[descriptionIndex]?.value ?? "").replace(/^!\s*/, "");
  const atLeft = descriptionIndex === 0;
  const atRight = descriptionIndex === plannerExercise.descriptions.length - 1;

  return (
    <div className="my-4">
      <GroupHeader name={props.header} />
      <div className="relative">
        {!atLeft && (
          <button
            className="absolute left-0 z-20 flex items-center justify-center w-8 h-8 px-4 ml-auto bg-white rounded-full outline-none focus:outline-none nm-scroller-left"
            style={{
              boxShadow: "0 0 1px 2px rgba(0,0,0,0.05)",
              top: "0px",
              left: "-20px",
            }}
            onClick={() => {
              const newValue = Math.max(0, descriptionIndex - 1);
              setDescriptionIndex(newValue);
              if (props.onUpdate) {
                props.onUpdate(newValue);
              }
            }}
          >
            {"<"}
          </button>
        )}
        {!atRight && (
          <button
            className="absolute right-0 z-20 flex items-center justify-center w-8 h-8 px-4 ml-auto bg-white rounded-full outline-none focus:outline-none nm-scroller-right"
            style={{
              boxShadow: "0 0 1px 2px rgba(0,0,0,0.05)",
              top: "0px",
              right: "-20px",
            }}
            onClick={() => {
              const newValue = Math.min(plannerExercise.descriptions.length - 1, descriptionIndex + 1);
              setDescriptionIndex(newValue);
              if (props.onUpdate) {
                props.onUpdate(newValue);
              }
            }}
          >
            {">"}
          </button>
        )}
        <div className="mx-4">
          {props.showCurrent &&
            props.plannerExercise.descriptions.length > 1 &&
            props.plannerExercise.descriptions[descriptionIndex]?.isCurrent && (
              <div
                className="absolute right-0 px-1 text-xs font-bold text-white rounded bg-grayv2-main"
                style={{ top: "-20px" }}
              >
                CURRENT
              </div>
            )}
          <Markdown value={description} />
        </div>
      </div>
    </div>
  );
}
