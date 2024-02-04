import React, { useState } from 'react'

import type { CronJob, CronJobInputData } from '../../../../types'
import { pluginName } from '../../../../utils/plugin'
import { getCurrentDate } from '../../utils/date'

import {
  Box,
  Button,
  Checkbox,
  DatePicker,
  Grid,
  GridItem,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
} from '@strapi/design-system'
import { useHistory } from 'react-router-dom'

const initialState: CronJobInputData = {
  name: '',
  schedule: '',
  executeScriptFromFile: true,
  pathToScript: '',
  script: 'console.log("Hello World!");',
  iterationsLimit: -1,
  startDate: null,
  endDate: null,
}

type Props = {
  initialData?: CronJob
  handleSubmit({ input, setErrors }): Promise<void>
}

export const CronJobForm: React.FunctionComponent<Props> = (props) => {
  const [input, setInput] = useState<CronJobInputData>(
    props.initialData ?? initialState
  )
  const isChecked = input.executeScriptFromFile
  const [errors, setErrors] = useState({})
  const history = useHistory()

  function handleInputChange(e: any) {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  function handleDateChange(inputName: string, value: Date | null) {
    if (inputName === 'startDate') {
      value?.setHours(0, 0, 0, 0)
    }
    if (inputName === 'endDate') {
      value?.setHours(23, 59, 59, 999)
    }
    handleInputChange({
      target: { name: inputName, value },
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.handleSubmit({
      input,
      setErrors,
    })
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
        <Grid gap={7} gridCols={1}>
          <Box>
            <TextInput
              placeholder="cron job name"
              required
              label="Name"
              name="name"
              aria-label="cron job name input"
              value={input.name}
              onChange={handleInputChange}
              error={errors['name']}
            />
          </Box>
          <Box>
            <TextInput
              placeholder="cron job schdule expression"
              required
              label="Schedule"
              name="schedule"
              aria-label="cron job schedule expression input"
              value={input.schedule}
              onChange={handleInputChange}
              error={errors['schedule']}
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
                    `cron job start date is ${formattedDate}`
                  }
                  selectedDate={
                    input.startDate ? new Date(input.startDate) : null
                  }
                  onChange={(value) => handleDateChange('startDate', value)}
                  onClear={(value) => handleDateChange('startDate', null)}
                  error={errors['startDate']}
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
                    `cron job end date is ${formattedDate}`
                  }
                  selectedDate={input.endDate ? new Date(input.endDate) : null}
                  onChange={(value) => handleDateChange('endDate', value)}
                  onClear={(value) => handleDateChange('endDate', null)}
                  error={errors['endDate']}
                />
              </Box>
            </GridItem>
          </Grid>
          <Box>
            <NumberInput
              placeholder="Number of iterationsLimit"
              label="Iterations"
              name="iterationsLimit"
              hint="Default: unlimited"
              aria-label="Number of iterations"
              value={input.iterationsLimit}
              onValueChange={(value) =>
                handleInputChange({
                  target: { name: 'iterationsLimit', value },
                })
              }
              error={errors['iterationsLimit']}
            />
          </Box>
          <Stack spacing={5}>
            <Checkbox
              name="executeScriptFromFile"
              checked={isChecked}
              onClick={(value) =>
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
            <TextInput
              placeholder="Path to script file"
              required={isChecked}
              label="Path to script file"
              name="pathToScript"
              aria-label="Path to cron job script file"
              hint={`Relative to ./src/extensions/${pluginName}`}
              value={input.pathToScript}
              onChange={handleInputChange}
              error={isChecked ? errors['pathToScript'] : ''}
              disabled={!isChecked}
            />
          </Stack>
          <Box>
            <Textarea
              placeholder={'console.log("Hello World!");'}
              required={!isChecked}
              label="Script"
              name="script"
              aria-label="cron job script input"
              onChange={(e) =>
                handleInputChange({
                  target: { name: 'script', value: e.target.value },
                })
              }
              error={!isChecked ? errors['script'] : ''}
              disabled={isChecked}
            >
              {input.script}
            </Textarea>
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
  )
}
