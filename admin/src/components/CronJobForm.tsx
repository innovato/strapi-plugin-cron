import {
  Button,
  Checkbox,
  DatePicker,
  Field,
  Flex,
  NumberInput,
  Textarea,
  TextInput,
} from '@strapi/design-system';
import { Calendar } from '@strapi/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob, CronJobInputData, CronJobInputErrors } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import { FormField } from '../components/FormField';
import { getDateAndTimeString, mapLocalDateToUTC } from '../utils/date';

const initialState: CronJobInputData = {
  name: '',
  schedule: '',
  executeScriptFromFile: true,
  pathToScript: '/example-script.ts',
  script: `console.log('Hello World!')
`,
  iterationsLimit: -1,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
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
  dataPreview?: boolean;
};

export const CronJobForm: React.FunctionComponent<Props> = (props) => {
  const [input, setInput] = useState<CronJobInputData>(props.initialData ?? initialState);
  const [errors, setErrors] = useState<CronJobInputErrors>({});
  const navigate = useNavigate();

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

  function handleDateChange(inputName: string, value: Date) {
    if (inputName === 'startDate') value?.setHours(0, 0, 0, 0);
    if (inputName === 'endDate') value?.setHours(23, 59, 59, 999);
    handleInputChange({
      target: { name: inputName, value: value.toISOString() },
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    props.handleSubmit({
      input,
      setErrors,
    });
  }

  const today = new Date();

  return (
    <form onSubmit={handleSubmit}>
      <FormField name="name" label="Name" error={errors['name']}>
        <TextInput
          placeholder="Cron job name"
          name="name"
          onChange={handleInputChange}
          value={input.name}
          required
          disabled={props.dataPreview}
        />
      </FormField>

      <FormField name="schedule" label="Schedule" error={errors['schedule']}>
        <TextInput
          placeholder="Cron job schdule expression"
          required
          label="Schedule"
          name="schedule"
          value={input.schedule}
          onChange={handleInputChange}
          disabled={props.dataPreview}
        />
      </FormField>

      <FormField
        name="startDate"
        label="Start date"
        hint="Publish on this date"
        error={errors['startDate']}
      >
        {props.dataPreview ? (
          <Field.Input
            disabled
            startAction={<Calendar />}
            value={getDateAndTimeString(input.startDate)}
          />
        ) : (
          <DatePicker
            id="startDate"
            initialDate={mapLocalDateToUTC(input.startDate)}
            onChange={(value: any) => handleDateChange('startDate', value)}
            disabled={props.dataPreview}
            required
            minDate={mapLocalDateToUTC(today.toISOString())}
          />
        )}
      </FormField>

      <FormField
        name="endDate"
        label="End date"
        hint="Unpublish on this date"
        error={errors['endDate']}
      >
        {props.dataPreview ? (
          <Field.Input
            disabled
            startAction={<Calendar />}
            value={getDateAndTimeString(input.endDate)}
          />
        ) : (
          <DatePicker
            id="endDate"
            initialDate={mapLocalDateToUTC(input.endDate)}
            onChange={(value: any) => handleDateChange('endDate', value)}
            disabled={props.dataPreview}
            required
            minDate={mapLocalDateToUTC(today.toISOString())}
          />
        )}
      </FormField>

      <FormField
        name="iterationsLimit"
        label="Iterations limit"
        hint="Unlimited when set to -1"
        error={errors['iterationsLimit']}
      >
        <NumberInput
          id="iterationsLimit"
          placeholder="Number of iterations"
          onValueChange={(value: any) =>
            handleInputChange({
              target: { name: 'iterationsLimit', value },
            })
          }
          value={input.iterationsLimit}
          disabled={props.dataPreview}
          required
        />
      </FormField>

      <FormField name="executeScriptFromFile" label="" error={errors['executeScriptFromFile']}>
        <Checkbox
          name="executeScriptFromFile"
          checked={input.executeScriptFromFile}
          onClick={(value: any) =>
            handleInputChange({
              target: {
                name: 'executeScriptFromFile',
                value: !input.executeScriptFromFile,
              },
            })
          }
          disabled={props.dataPreview}
        >
          Execute script from a file
        </Checkbox>
      </FormField>

      <FormField
        name="pathToScript"
        label="Path to script file"
        hint={`Relative to ./src/extensions/${PLUGIN_ID}`}
        error={input.executeScriptFromFile ? errors['pathToScript'] : undefined}
      >
        <TextInput
          placeholder="Path to script file"
          name="pathToScript"
          value={input.pathToScript}
          disabled={props.dataPreview || !input.executeScriptFromFile}
          required={input.executeScriptFromFile}
          onChange={handleInputChange}
        />
      </FormField>

      <FormField
        name="script"
        label="Script"
        width="100%"
        error={!input.executeScriptFromFile ? errors['script'] : undefined}
      >
        <Textarea
          placeholder={'console.log("Hello World!");'}
          name="script"
          value={input.script}
          disabled={props.dataPreview || input.executeScriptFromFile}
          required={!input.executeScriptFromFile}
          onChange={(e: any) => {
            handleInputChange({
              target: { name: 'script', value: e.target.value },
            });
            // adjustTextareaHeight();
          }}
        />
      </FormField>

      {!props.dataPreview && (
        <Flex gap={5} marginTop={5}>
          <Button size="L" type="submit">
            Save
          </Button>
          <Button size="L" variant="tertiary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Flex>
      )}
    </form>
  );
};

export const CronJobFormView = ({ data }: { data: CronJob }) => {
  return <CronJobForm dataPreview handleSubmit={() => Promise.resolve()} initialData={data} />;
};
