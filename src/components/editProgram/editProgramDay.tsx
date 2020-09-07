import { h, JSX, Fragment } from "preact";
import { IProgram, IProgramDay } from "../../models/program";
import { IDispatch } from "../../ducks/types";
import { HeaderView } from "../header";
import { FooterView } from "../footer";
import { MenuItemEditable } from "../menuItemEditable";
import { LensBuilder } from "../../utils/lens";
import { IState } from "../../ducks/reducer";
import { EditProgram } from "../../models/editProgram";
import { Button } from "../button";
import { DraggableList } from "../draggableList";
import { ISettings } from "../../models/settings";
import { GroupHeader } from "../groupHeader";
import { MenuItem } from "../menuItem";
import { IconCheck } from "../iconCheck";
import { IconDelete } from "../iconDelete";
import { IconEdit } from "../iconEdit";
import { SemiButton } from "../semiButton";

interface IProps {
  isProgress: boolean;
  dayIndex: number;
  settings: ISettings;
  editProgram: IProgram;
  editDay: IProgramDay;
  editDayLensBuilder: LensBuilder<IState, IProgramDay>;
  dispatch: IDispatch;
}

export interface IEditSet {
  excerciseIndex: number;
  setIndex?: number;
}

export function EditProgramDay(props: IProps): JSX.Element {
  const program = props.editProgram;
  const day = props.editDay;

  return (
    <section className="h-full">
      <HeaderView
        title={day.name}
        subtitle="Edit Program Day"
        left={<button onClick={() => props.dispatch({ type: "PullScreen" })}>Back</button>}
      />
      <section style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}>
        <section className="flex-1 overflow-y-auto">
          <MenuItemEditable
            type="text"
            name="Name:"
            value={day.name}
            onChange={(newValue) => {
              if (newValue != null) {
                EditProgram.setDayName(props.dispatch, props.editDayLensBuilder, newValue);
              }
            }}
          />
          <GroupHeader name="Selected excercises" />
          <DraggableList
            items={day.excercises}
            element={(excerciseRef, i, handleTouchStart) => {
              const excercise = program.excercises.find((e) => e.id === excerciseRef.id)!;
              return (
                <MenuItem
                  handleTouchStart={handleTouchStart}
                  name={excercise.name}
                  value={
                    <Fragment>
                      <button
                        className="p-2 align-middle button"
                        onClick={() => EditProgram.editProgramExcercise(props.dispatch, excercise)}
                      >
                        <IconEdit size={20} lineColor="#0D2B3E" penColor="#A5B3BB" />
                      </button>
                      <button
                        className="p-2 align-middle button"
                        onClick={() =>
                          EditProgram.toggleDayExcercise(props.dispatch, program, props.dayIndex, excercise.id)
                        }
                      >
                        <IconDelete />
                      </button>
                    </Fragment>
                  }
                />
              );
            }}
            onDragEnd={(startIndex, endIndex) => {
              EditProgram.reorderExcercises(props.dispatch, props.editDayLensBuilder, startIndex, endIndex);
            }}
          />
          <div class="p-1">
            <SemiButton
              onClick={() => {
                EditProgram.addProgramExcercise(props.dispatch);
              }}
            >
              Create New Excercise
            </SemiButton>
          </div>
          <GroupHeader name="Available excercises" />
          {program.excercises.map((excercise) => (
            <MenuItem
              name={excercise.name}
              onClick={() => {
                EditProgram.toggleDayExcercise(props.dispatch, program, props.dayIndex, excercise.id);
              }}
              value={
                day.excercises.some((e) => e.id === excercise.id) ? (
                  <div className="flex flex-row-reverse">
                    <IconCheck />
                  </div>
                ) : undefined
              }
            />
          ))}
        </section>

        {props.isProgress && (
          <div className="py-3 text-center">
            <Button kind="green" onClick={() => props.dispatch({ type: "SaveProgressDay" })}>
              Save
            </Button>
          </div>
        )}
      </section>

      <FooterView dispatch={props.dispatch} />
    </section>
  );
}
