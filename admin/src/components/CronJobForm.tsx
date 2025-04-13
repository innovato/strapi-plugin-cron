import {
  Button,
  Checkbox,
  DatePicker,
  Field,
  Flex,
  NumberInput,
  TextInput,
} from '@strapi/design-system';
import { Calendar } from '@strapi/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob, CronJobInputData, CronJobInputErrors } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import { FormField } from '../components/FormField';
import { getDateAndTimeString, mapLocalDateToUTC } from '../utils/date';

import { CodeField } from './CodeField';

const initialState: CronJobInputData = {
  name: '',
  schedule: '',
  executeScriptFromFile: true,
  pathToScript: '/example-cron-script.js',
  script: [
    'console.log(`${cronJob.name} – ${cronJob.iterationsCount} / ${cronJob.iterationsLimit}`)',
  ].join('\n'),
  iterationsLimit: -1,
  startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
  endDate: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
};

type Props = {
  initialData?: CronJob;
  handleSubmit: (data: CronJobInputData) => Promise<any>;
  previewData?: boolean;
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await props.handleSubmit?.(input);
    } catch (error: any) {
      if (error.message === 'ValidationError') {
        const errors: Record<string, string> = {};
        error.details.errors.map(({ path: [name], message }: any) => {
          errors[name] = message;
        });
        setErrors(errors);
      } else {
        throw error;
      }
    }
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
          disabled={props.previewData}
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
          disabled={props.previewData}
        />
      </FormField>

      <FormField
        name="startDate"
        label="Start date"
        hint="Publish on this date"
        error={errors['startDate']}
      >
        {props.previewData ? (
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
            disabled={props.previewData}
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
        {props.previewData ? (
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
            disabled={props.previewData}
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
          disabled={props.previewData}
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
          disabled={props.previewData}
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
        <CodeField
          value={input.pathToScript}
          onValueChange={(value) => {
            if (props.previewData) return;
            if (value.trim() === input.pathToScript) return;
            handleInputChange({
              target: { name: 'pathToScript', value },
            });
          }}
          disabled={!input.executeScriptFromFile}
        />
      </FormField>

      <FormField
        name="script"
        label="Script"
        width="100%"
        error={!input.executeScriptFromFile ? errors['script'] : undefined}
      >
        <CodeField
          value={input.script}
          onValueChange={(value) => {
            if (props.previewData) return;
            handleInputChange({
              target: { name: 'script', value },
            });
          }}
          disabled={input.executeScriptFromFile}
          variant="javascript"
        />
      </FormField>

      {!props.previewData && (
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
  return <CronJobForm previewData handleSubmit={Promise.resolve} initialData={data} />;
};
