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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CronJob, CronJobInputData, CronJobInputErrors } from '../../../types';
import { PLUGIN_ID } from '../../../utils/plugin';
import { FormField } from '../components/FormField';
import { getDateAndTimeString, mapLocalDateToUTC } from '../utils/date';

import { Textarea } from '@strapi/design-system';

const getInitialState = (): CronJobInputData => ({
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
});

const getInitialInputData = (initialData?: CronJob): CronJobInputData => {
  if (!initialData) return getInitialState();

  const fallback = getInitialState();

  return {
    name: initialData.name ?? fallback.name,
    schedule: initialData.schedule ?? fallback.schedule,
    executeScriptFromFile: initialData.executeScriptFromFile ?? fallback.executeScriptFromFile,
    pathToScript: initialData.pathToScript ?? fallback.pathToScript,
    script: initialData.script ?? fallback.script,
    iterationsLimit: initialData.iterationsLimit ?? fallback.iterationsLimit,
    startDate: initialData.startDate ?? fallback.startDate,
    endDate: initialData.endDate ?? fallback.endDate,
  };
};

const getInitialInputDataKey = (initialData?: CronJob) => {
  if (!initialData) return 'new';

  return JSON.stringify({
    name: initialData.name,
    schedule: initialData.schedule,
    executeScriptFromFile: initialData.executeScriptFromFile,
    pathToScript: initialData.pathToScript,
    script: initialData.script,
    iterationsLimit: initialData.iterationsLimit,
    startDate: initialData.startDate,
    endDate: initialData.endDate,
  });
};

type Props = {
  initialData?: CronJob;
  handleSubmit: (data: CronJobInputData) => Promise<any>;
  previewData?: boolean;
};

export const CronJobForm: React.FunctionComponent<Props> = (props) => {
  const initialInputDataKey = getInitialInputDataKey(props.initialData);
  const initialDataDocumentId = props.initialData?.documentId;
  const previousInitialInputDataKey = useRef(initialInputDataKey);
  const previousInitialDataDocumentId = useRef(initialDataDocumentId);
  const isDirty = useRef(false);
  const [input, setInput] = useState<CronJobInputData>(() =>
    getInitialInputData(props.initialData)
  );
  const [errors, setErrors] = useState<CronJobInputErrors>({});
  const navigate = useNavigate();

  useEffect(() => {
    const isDifferentDocument = previousInitialDataDocumentId.current !== initialDataDocumentId;
    if (previousInitialInputDataKey.current === initialInputDataKey && !isDifferentDocument) {
      return;
    }

    previousInitialInputDataKey.current = initialInputDataKey;
    previousInitialDataDocumentId.current = initialDataDocumentId;

    if (isDirty.current && !isDifferentDocument) return;

    setInput(getInitialInputData(props.initialData));
    setErrors({});
    isDirty.current = false;
  }, [initialInputDataKey, initialDataDocumentId, props.initialData]);

  function handleInputChange(e: any) {
    isDirty.current = true;

    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
    setErrors((errors) => {
      const nextErrors = { ...errors };
      delete nextErrors[name as keyof CronJobInputErrors];
      return nextErrors;
    });
  }

  function handleDateChange(inputName: string, value?: Date) {
    if (!value) return;

    const nextDate = new Date(value);
    if (inputName === 'startDate') nextDate.setHours(0, 0, 0, 0);
    if (inputName === 'endDate') nextDate.setHours(23, 59, 59, 999);
    handleInputChange({
      target: { name: inputName, value: nextDate.toISOString() },
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

  const startDate = useMemo(() => mapLocalDateToUTC(input.startDate), [input.startDate]);
  const endDate = useMemo(() => mapLocalDateToUTC(input.endDate), [input.endDate]);
  const minDate = useMemo(() => mapLocalDateToUTC(new Date().toISOString()), []);

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
            initialDate={startDate}
            value={startDate}
            onChange={(value) => handleDateChange('startDate', value)}
            disabled={props.previewData}
            required
            minDate={minDate}
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
            initialDate={endDate}
            value={endDate}
            onChange={(value) => handleDateChange('endDate', value)}
            disabled={props.previewData}
            required
            minDate={minDate}
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
        <TextInput
          name="pathToScript"
          onChange={handleInputChange}
          value={input.pathToScript}
          required
          disabled={props.previewData || !input.executeScriptFromFile}
        />
      </FormField>

      <FormField
        name="script"
        label="Script"
        width="100%"
        error={!input.executeScriptFromFile ? errors['script'] : undefined}
      >
        <Textarea
          name="script"
          value={input.script}
          onChange={handleInputChange}
          disabled={props.previewData || input.executeScriptFromFile}
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
