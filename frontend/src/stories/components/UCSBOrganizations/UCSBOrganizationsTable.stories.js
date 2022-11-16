import React from 'react';

import UCSBOrganizationsTable from "main/components/UCSBOrganizations/UCSBOrganizationsTable";
import { ucsbOrganizationsFixtures } from 'fixtures/ucsbOrganizationsFixtures';

export default {
    title: 'components/UCSBOrganizations/UCSBOrganizationsTable',
    component: UCSBOrganizationsTable
};

const Template = (args) => {
    return (
        <UCSBOrganizationsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    orgs: []
};

export const ThreeOrgs = Template.bind({});

ThreeOrgs.args = {
    orgs: ucsbOrganizationsFixtures.threeOrgs
};
