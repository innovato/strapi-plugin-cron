import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Textarea } from "@strapi/design-system/Textarea";
import { TextInput } from "@strapi/design-system/TextInput";
import { Typography } from "@strapi/design-system/Typography";
import React from "react";

export const NewCronJob: React.FunctionComponent = () => {
  return (
    <>
      <Box padding={8} background="neutral0">
        <Grid gap={5}>
          <GridItem col={3}>
            <Box padding={2}>
              <Typography variant="delta">Name</Typography>
            </Box>
          </GridItem>
          <GridItem col={9}>
            <Box padding={2}>
              <TextInput
                name="name"
                required
                placeholder="Cron Job name"
                aria-label="Cron Job name input"
              />
            </Box>
          </GridItem>
          <GridItem col={3}>
            <Box padding={2}>
              <Typography variant="delta">Schedule</Typography>
            </Box>
          </GridItem>
          <GridItem col={9}>
            <Box padding={2}>
              <TextInput
                name="schedule"
                required
                placeholder="Cron Job schdule expression"
                aria-label="Cron Job schedule expression input"
              />
            </Box>
          </GridItem>
          <GridItem col={3}>
            <Box padding={2}>
              <Typography variant="delta">Iterations</Typography>
            </Box>
          </GridItem>
          <GridItem col={9}>
            <Box padding={2}>
              <Typography variant="omgea">
                Number of iterations (optional)
              </Typography>
              <br />
              <br />
              <Typography variant="omgea">
                default: "undefined" – unlimited iterations
              </Typography>
              <br />
              <Typography variant="omgea">
                {"<positive_integer>"} – finite number of iterations
              </Typography>
            </Box>
          </GridItem>
          <GridItem col={12}>
            <Box padding={2}>
              <Typography variant="delta">Script</Typography>
            </Box>
          </GridItem>
          <GridItem col={12}>
            <Box padding={2}>
              <Textarea
                name="script"
                required
                placeholder="Cron Job script"
                aria-label="Cron Job script input"
              />
            </Box>
          </GridItem>
          <GridItem col={12}>
            <Box padding={2}>
              <Button size="L">Save</Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
