import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import { selection, SelectionEvent } from "@canva/preview/design";
import * as React from "react";
import styles from "styles/components.css";

export const App = () => {
  const [event, setEvent] = React.useState<
    SelectionEvent<"text"> | undefined
  >();

  React.useEffect(() => {
    selection.registerOnChange({
      scope: "text",
      onChange: async (event) => {
        setEvent(event);
      },
    });
  }, []);

  const isElementSelected = event && event.count > 0;

  const createTextBox = () => {
    addNativeElement({
      type: "TEXT",
      children: ["Hello world!"],
    });
  };

  const updateTextBox = async (e: { target: { value: any; }; }) => {
    if (!event || !isElementSelected) {
      return;
    }

    await selection.setContent(event, (value) => {
      return {
        text: e.target.value,
      };
    });
  }

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Button variant="primary" onClick={createTextBox} stretch>
          Create a New Text Box
        </Button>

        {(() => {
          if (isElementSelected) {
            return (
              <div>
                Enter text
                <br></br>
                <input type="text" name="name" onChange={updateTextBox} />
              </div>
            )
          } else {
            return (
              <div>
                -- OR --
                <br></br>
                Select a text box on the canvas to edit it
              </div>
            )
          }
        })()}
      </Rows>
    </div>
  );
};
