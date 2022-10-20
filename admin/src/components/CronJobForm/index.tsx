import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { DatePicker } from "@strapi/design-system/DatePicker";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { NumberInput } from "@strapi/design-system/NumberInput";
import { Stack } from "@strapi/design-system/Stack";
import { Textarea } from "@strapi/design-system/Textarea";
import { TextInput } from "@strapi/design-system/TextInput";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import type { CronJob, CronJobInputData } from "../../../../types";
import { pluginName } from "../../../../utils/plugin";
import { getCurrentDate } from "../../utils/date";

const initialInput: CronJobInputData = {
  name: "",
  schedule: "* * * * * *",
  isPathToScriptOptChecked: true,
  pathToScript: "",
  script: `console.log("")`,
  iterations: -1,
  startDate: null,
  endDate: null,
};

type Props = {
  initialData?: CronJob;
  handleSubmit({ input, setErrors }): Promise<void>;
};

export const CronJobForm: React.FunctionComponent<Props> = ({
  initialData,
  ...props
}) => {
  const state = initialData
    ? {
        ...initialData,
        isPathToScriptOptChecked: !!initialData.pathToScript,
      }
    : initialInput;
  const [input, setInput] = useState<CronJobInputData>(state);
  const isChecked = input.isPathToScriptOptChecked;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

  function handleDateChange(inputName: string, value: Date | null) {
    if (inputName === "startDate") {
      value?.setHours(0, 0, 0, 0);
    }
    if (inputName === "endDate") {
      value?.setHours(23, 59, 59, 999);
    }
    handleInputChange({
      target: { name: inputName, value },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit({
      input: {
        ...input,
        pathToScript: input.isPathToScriptOptChecked ? input.pathToScript : "",
        script: input.isPathToScriptOptChecked ? "" : input.script,
      },
      setErrors,
    });
  }

  return (
    <Box
      padding={8}
      marginBottom={8}
      borderStyle={"solid"}
      borderWidth={"1px"}
      borderColor={"neutral150"}
      borderRadius={"4px"}
      shadow="tableShadow"
      background="neutral0"
    >
      <form onSubmit={handleSubmit}>
        <Grid gap={7} gridCols={1}>
          <Box>
            <TextInput
              placeholder="Cron Job name"
              required
              label="Name"
              name="name"
              aria-label="Cron Job name input"
              value={input.name}
              onChange={handleInputChange}
              error={errors["name"]}
            />
          </Box>
          <Box>
            <TextInput
              placeholder="Cron Job schdule expression"
              required
              label="Schedule"
              name="schedule"
              aria-label="Cron Job schedule expression input"
              value={input.schedule}
              onChange={handleInputChange}
              error={errors["schedule"]}
            />
          </Box>
          <Grid gap={7} gridCols={2}>
            <GridItem col={1} s={2} xs={2}>
              <Box>
                <DatePicker
                  placeholder={getCurrentDate()}
                  label="Start date"
                  name="startDate"
                  hint="Publish on this date"
                  selectedDateLabel={(formattedDate) =>
                    `Cron Job start date is ${formattedDate}`
                  }
                  selectedDate={
                    input.startDate ? new Date(input.startDate) : null
                  }
                  onChange={(value) => handleDateChange("startDate", value)}
                  onClear={(value) => handleDateChange("startDate", null)}
                  error={errors["startDate"]}
                />
              </Box>
            </GridItem>
            <GridItem col={1} s={2} xs={2}>
              <Box>
                <DatePicker
                  placeholder={getCurrentDate()}
                  label="End date"
                  name="endDate"
                  hint="Unpublish on this date"
                  selectedDateLabel={(formattedDate) =>
                    `Cron Job end date is ${formattedDate}`
                  }
                  selectedDate={input.endDate ? new Date(input.endDate) : null}
                  onChange={(value) => handleDateChange("endDate", value)}
                  onClear={(value) => handleDateChange("endDate", null)}
                  error={errors["endDate"]}
                />
              </Box>
            </GridItem>
          </Grid>
          <Box>
            <NumberInput
              placeholder="Number of iterations"
              label="Iterations"
              name="iterations"
              hint="Default: unlimited"
              aria-label="Number of iterations"
              value={input.iterations}
              onValueChange={(value) =>
                handleInputChange({ target: { name: "iterations", value } })
              }
              error={errors["iterations"]}
            />
          </Box>
          <Stack spacing={5}>
            <Checkbox
              name="isPathToScriptOptChecked"
              checked={isChecked}
              onClick={(value) =>
                handleInputChange({
                  target: {
                    name: "isPathToScriptOptChecked",
                    value: !isChecked,
                  },
                })
              }
            >
              Use a script file stored in the project folder
            </Checkbox>
            <TextInput
              placeholder="Path to script file"
              required={isChecked}
              label="Path to file"
              name="pathToScript"
              aria-label="Path to Cron Job script file"
              hint={`Relative to ./src/extensions/${pluginName}`}
              value={input.pathToScript}
              onChange={handleInputChange}
              error={isChecked ? errors["pathToScript"] : ""}
              disabled={!isChecked}
            />
          </Stack>
          <Box>
            <Textarea
              placeholder="Cron Job script"
              required={!isChecked}
              label="Script"
              name="script"
              aria-label="Cron Job script input"
              value={input.script}
              onChange={handleInputChange}
              error={!isChecked ? errors["script"] : ""}
              disabled={isChecked}
            />
          </Box>
          <Stack horizontal spacing={4}>
            <Button size="L" type="submit">
              Save
            </Button>
            <Button
              size="L"
              variant="tertiary"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </form>
    </Box>
  );
};
