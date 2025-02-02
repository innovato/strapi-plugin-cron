import {
  Box,
  Button,
  Checkbox,
  DatePicker,
  Field,
  Flex,
  Grid,
  NumberInput,
  Textarea,
  TextInput,
} from '@strapi/design-system';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob, CronJobInputData, CronJobInputErrors } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';

const initialState: CronJobInputData = {
  name: '',
  schedule: '',
  executeScriptFromFile: true,
  pathToScript: '/example-script.ts',
  script: `console.log('Hello World!')
`,
  iterationsLimit: -1,
  startDate: null,
  endDate: null,
};

type Props = {
  initialData?: CronJob;
  handleSubmit({
    input,
    setErrors,
  }: {
    input: CronJobInputData;
    setErrors: (errors: CronJobInputErrors) => void;
  }): Promise<void>;
};

export const CronJobForm: React.FunctionComponent<Props> = (props) => {
  const [input, setInput] = useState<CronJobInputData>(props.initialData ?? initialState);
  const isChecked = input.executeScriptFromFile;
  const [errors, setErrors] = useState<CronJobInputErrors>({});
  const navigate = useNavigate();
  const textareaRef = useRef<typeof Textarea>(null);

  useEffect(() => {
    // adjustTextareaHeight();
  }, []);

  const adjustTextareaHeight = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

  function handleDateChange(inputName: string, value: Date | null) {
    if (inputName === 'startDate') {
      value?.setHours(0, 0, 0, 0);
    }
    if (inputName === 'endDate') {
      value?.setHours(23, 59, 59, 999);
    }
    handleInputChange({
      target: { name: inputName, value },
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    props.handleSubmit({
      input,
      setErrors,
    });
  }

  return (
    <Box
      padding={8}
      marginBottom={8}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderColor={'neutral150'}
      borderRadius={'4px'}
      shadow="tableShadow"
      background="neutral0"
    >
      <form onSubmit={handleSubmit}>
        <Grid.Root gap={7} gridCols={1}>
          <Box>
            <Field.Root id="name" error={errors['name']}>
              <Field.Label>Name</Field.Label>
              <TextInput
                placeholder="Cron job name"
                name="name"
                onChange={handleInputChange}
                value={input.name}
                required
              />
              <Field.Error />
            </Field.Root>
          </Box>
          <Box>
            <Field.Root id="schedule" error={errors['schedule']}>
              <Field.Label>Schedule</Field.Label>
              <TextInput
                placeholder="Cron job schdule expression"
                required
                label="Schedule"
                name="schedule"
                value={input.schedule}
                onChange={handleInputChange}
              />
              <Field.Error />
            </Field.Root>
          </Box>
          <Grid.Root gap={7} gridCols={2}>
            <Grid.Item col={1} s={2} xs={2}>
              <Field.Root id="startDate" error={errors['startDate']} hint="Publish on this date">
                <Field.Label>Start date</Field.Label>
                <DatePicker
                  id="startDate"
                  initialDate={input.startDate ? new Date(input.startDate) : null}
                  onChange={(value: any) => handleDateChange('startDate', value)}
                  onClear={(value: any) => handleDateChange('startDate', null)}
                />
                <Field.Error />
                <Field.Hint />
              </Field.Root>
            </Grid.Item>
            <Grid.Item col={1} s={2} xs={2}>
              <Field.Root id="endDate" error={errors['endDate']} hint="Unpublish on this date">
                <Field.Label>End date</Field.Label>
                <DatePicker
                  id="endDate"
                  initialDate={input.endDate ? new Date(input.endDate) : null}
                  onChange={(value: any) => handleDateChange('endDate', value)}
                  onClear={(value: any) => handleDateChange('endDate', null)}
                />
                <Field.Error />
                <Field.Hint />
              </Field.Root>
            </Grid.Item>
          </Grid.Root>
          <Box>
            <Field.Root
              id="iterationsLimit"
              error={errors['iterationsLimit']}
              hint="Unlimited when set to -1"
            >
              <Field.Label>Iterations</Field.Label>
              <NumberInput
                id="iterationsLimit"
                placeholder="Number of iterations"
                onValueChange={(value: any) =>
                  handleInputChange({
                    target: { name: 'iterationsLimit', value },
                  })
                }
                value={input.iterationsLimit}
              />
              <Field.Error />
              <Field.Hint />
            </Field.Root>
          </Box>
          <Flex
            gap={{
              initial: 5,
            }}
          >
            <Checkbox
              name="executeScriptFromFile"
              checked={isChecked}
              onClick={(value: any) =>
                handleInputChange({
                  target: {
                    name: 'executeScriptFromFile',
                    value: !isChecked,
                  },
                })
              }
            >
              Execute script from a file
            </Checkbox>
            <Field.Root
              id="pathToScript"
              error={isChecked ? errors['pathToScript'] : ''}
              hint={`Relative to ./src/extensions/${PLUGIN_ID}`}
            >
              <Field.Label>Path to script file</Field.Label>
              <TextInput
                placeholder="Path to script file"
                required={isChecked}
                name="pathToScript"
                value={input.pathToScript}
                onChange={handleInputChange}
                disabled={!isChecked}
              />
              <Field.Error />
              <Field.Hint />
            </Field.Root>
          </Flex>
          <Box>
            <Field.Root id="script" error={!isChecked ? errors['script'] : ''}>
              <Field.Label>Script</Field.Label>
              <Textarea
                ref={textareaRef}
                placeholder={'console.log("Hello World!");'}
                required={!isChecked}
                name="script"
                onChange={(e: any) => {
                  handleInputChange({
                    target: { name: 'script', value: e.target.value },
                  });
                  // adjustTextareaHeight();
                }}
                disabled={isChecked}
                value={input.script}
              />
              <Field.Error />
            </Field.Root>
          </Box>
          <Flex
            gap={{
              initial: 4,
            }}
          >
            <Button size="L" type="submit">
              Save
            </Button>
            <Button size="L" variant="tertiary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Flex>
        </Grid.Root>
      </form>
    </Box>
  );
};
