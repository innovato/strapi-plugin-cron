import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Grid } from "@strapi/design-system/Grid";
import { NumberInput } from "@strapi/design-system/NumberInput";
import { Textarea } from "@strapi/design-system/Textarea";
import { TextInput } from "@strapi/design-system/TextInput";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { cron } from "../../api/cron";
import { getResponseErrors } from "../../utils/getResponseErrors";
import { pluginBasePath } from "../../utils/plugin";

const initialInput = {
  name: "",
  schedule: "",
  script: "",
  iterations: null,
};

export const NewCronJob: React.FunctionComponent = () => {
  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await cron.createNewCronJob(input);
      history.push(pluginBasePath);
    } catch (error) {
      const errors = getResponseErrors(error.response);
      setErrors(errors);
    }
  }

  return (
    <>
      <Box padding={8} background="neutral0">
        <form onSubmit={handleFormSubmit}>
          <Grid gap={5} gridCols={1}>
            <Box padding={2}>
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
            <Box padding={2}>
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
            <Box padding={2}>
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
                // min value
              />
            </Box>
            <Box padding={2}>
              <Textarea
                placeholder="Cron Job script"
                required
                label="Script"
                name="script"
                aria-label="Cron Job script input"
                value={input.script}
                onChange={handleInputChange}
                error={errors["script"]}
              />
            </Box>
            <Box padding={2}>
              <Button size="L" type="submit">
                Save
              </Button>
            </Box>
          </Grid>
        </form>
      </Box>
    </>
  );
};
